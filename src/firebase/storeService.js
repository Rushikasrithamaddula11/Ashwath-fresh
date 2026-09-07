import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_SAMPLE_ORDERS } from './seedData';

// Storage key names for local fallback
const STORAGE_KEYS = {
  PRODUCTS: 'ashwath_products',
  DELETED_PRODUCTS: 'ashwath_deleted_product_ids',
  CATEGORIES: 'ashwath_categories',
  ORDERS: 'ashwath_orders',
  SETTINGS: 'ashwath_settings',
  CUSTOMERS: 'ashwath_customers'
};

const STOREFRONT_CATEGORY_NAMES = new Set(['Fruits', 'Vegetables', 'Palakova']);

// Helper to get local storage item or initialize
const getLocalData = (key, initial) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return initial;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
};

const getDeletedProductIds = () => new Set(getLocalData(STORAGE_KEYS.DELETED_PRODUCTS, []));

const markProductDeleted = (productId) => {
  const deletedIds = getDeletedProductIds();
  deletedIds.add(productId);
  setLocalData(STORAGE_KEYS.DELETED_PRODUCTS, [...deletedIds]);
};

// Keep the core storefront catalogue available when Firebase has not received
// one of the default records yet, while letting saved Firebase data win.
const mergeWithDefaultRecords = (defaults, records) => {
  const recordIds = new Set(records.map((record) => record.id));
  return [...records, ...defaults.filter((record) => !recordIds.has(record.id))];
};

const getStorefrontCategories = (records) =>
  mergeWithDefaultRecords(INITIAL_CATEGORIES, records)
    .filter((category) => STOREFRONT_CATEGORY_NAMES.has(category.name))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

const getStorefrontProducts = (records) => {
  const deletedIds = getDeletedProductIds();
  return mergeWithDefaultRecords(INITIAL_PRODUCTS, records)
    .filter((product) => !['prod-combo-01', 'prod-juice-01', 'prod-dryfruit-01'].includes(product.id))
    .filter((product) => product.id === 'prod-palakova-01' || !deletedIds.has(product.id))
    .map((product) => product.id === 'prod-palakova-01' ? { ...product, imageUrl: '/palakova.svg' } : product);
};

// ----------------------------------------------------
// SEED DATABASE
// ----------------------------------------------------
export const seedDatabase = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);

      // Seed categories
      for (const cat of INITIAL_CATEGORIES) {
        const catRef = doc(db, 'categories', cat.id);
        batch.set(catRef, cat, { merge: true });
      }

      // Seed products
      for (const prod of INITIAL_PRODUCTS) {
        const prodRef = doc(db, 'products', prod.id);
        batch.set(prodRef, prod, { merge: true });
      }

      // Seed store settings
      const settingsRef = doc(db, 'settings', 'store');
      batch.set(settingsRef, INITIAL_SETTINGS, { merge: true });

      await batch.commit();
      console.log('Firebase Database seeded successfully!');
      return { success: true, message: 'Database seeded successfully in Firebase!' };
    } catch (err) {
      console.error('Error seeding Firebase database:', err);
      throw err;
    }
  } else {
    setLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setLocalData(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setLocalData(STORAGE_KEYS.ORDERS, INITIAL_SAMPLE_ORDERS);
    return { success: true, message: 'Local storage seeded with default fruits and settings!' };
  }
};

// ----------------------------------------------------
// CATEGORIES SERVICE
// ----------------------------------------------------
export const getCategoriesService = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      if (snapshot.empty) {
        await seedDatabase();
        const retrySnap = await getDocs(collection(db, 'categories'));
        return retrySnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      return getStorefrontCategories(list);
    } catch (e) {
      console.warn('Firestore fetch error for categories, using fallback:', e);
      return getStorefrontCategories(getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES));
    }
  }
  return getStorefrontCategories(getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES));
};

export const saveCategoryService = async (categoryData) => {
  const id = categoryData.id || `cat-${Date.now()}`;
  const data = {
    ...categoryData,
    id,
    slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'categories', id), data, { merge: true });
    } catch (e) {
      console.error('Firestore category save failed:', e);
    }
  }

  // Update local fallback
  const list = getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const idx = list.findIndex(c => c.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...data };
  } else {
    list.push(data);
  }
  setLocalData(STORAGE_KEYS.CATEGORIES, list);
  return data;
};

export const deleteCategoryService = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (e) {
      console.error('Firestore category delete failed:', e);
    }
  }
  const list = getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const updated = list.filter(c => c.id !== id);
  setLocalData(STORAGE_KEYS.CATEGORIES, updated);
  return true;
};

// ----------------------------------------------------
// PRODUCTS SERVICE
// ----------------------------------------------------
export const getProductsService = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      if (snapshot.empty) {
        await seedDatabase();
        const retrySnap = await getDocs(collection(db, 'products'));
        return retrySnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      return getStorefrontProducts(list);
    } catch (e) {
      console.warn('Firestore fetch error for products, using fallback:', e);
      return getStorefrontProducts(getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
    }
  }
  return getStorefrontProducts(getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
};

export const getProductByIdService = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch (e) {
      console.warn('Firestore fetch error for single product:', e);
    }
  }
  const list = getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  return list.find(p => p.id === id) || null;
};

export const saveProductService = async (productData) => {
  const id = productData.id || `prod-${Date.now()}`;
  const now = new Date().toISOString();
  const data = {
    ...productData,
    id,
    price: Number(productData.price) || 0,
    stock: Number(productData.stock) || 0,
    featured: Boolean(productData.featured),
    active: productData.active !== undefined ? Boolean(productData.active) : true,
    updatedAt: now,
    createdAt: productData.createdAt || now
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'products', id), data, { merge: true });
    } catch (e) {
      console.error('Firestore product save failed:', e);
    }
  }

  const list = getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const idx = list.findIndex(p => p.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...data };
  } else {
    list.unshift(data);
  }
  setLocalData(STORAGE_KEYS.PRODUCTS, list);
  return data;
};

export const deleteProductService = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.error('Firestore product delete failed:', e);
    }
  }
  markProductDeleted(id);
  const list = getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updated = list.filter(p => p.id !== id);
  setLocalData(STORAGE_KEYS.PRODUCTS, updated);
  return true;
};

// ----------------------------------------------------
// ORDERS SERVICE
// ----------------------------------------------------
export const createOrderService = async (orderData) => {
  // Validate subtotal minimum ₹200 requirement
  if ((orderData.subtotal || 0) < 200) {
    throw new Error('Minimum order value is ₹200.');
  }

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const newOrder = {
    ...orderData,
    orderId,
    paymentMethod: 'COD',
    paymentStatus: orderData.paymentStatus || 'Pending',
    orderStatus: orderData.orderStatus || 'Pending',
    createdAt: now,
    updatedAt: now
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (e) {
      console.error('Firestore create order failed:', e);
    }
  }

  // Save to local storage
  const orders = getLocalData(STORAGE_KEYS.ORDERS, INITIAL_SAMPLE_ORDERS);
  orders.unshift(newOrder);
  setLocalData(STORAGE_KEYS.ORDERS, orders);

  return newOrder;
};

export const getOrdersService = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'orders'));
      if (!snapshot.empty) {
        return snapshot.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    } catch (e) {
      console.warn('Firestore fetch error for orders, using fallback:', e);
    }
  }
  return getLocalData(STORAGE_KEYS.ORDERS, INITIAL_SAMPLE_ORDERS)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getCustomerOrdersService = async (customerId, phone, email) => {
  const allOrders = await getOrdersService();
  return allOrders.filter(o =>
    (customerId && o.customerId === customerId) ||
    (phone && o.phone === phone) ||
    (email && o.email === email)
  );
};

export const updateOrderStatusService = async (orderId, orderStatus, paymentStatus) => {
  const now = new Date().toISOString();
  const updates = { updatedAt: now };
  if (orderStatus) updates.orderStatus = orderStatus;
  if (paymentStatus) updates.paymentStatus = paymentStatus;

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'orders', orderId), updates);
    } catch (e) {
      console.error('Firestore order update failed:', e);
    }
  }

  const orders = getLocalData(STORAGE_KEYS.ORDERS, INITIAL_SAMPLE_ORDERS);
  const idx = orders.findIndex(o => o.orderId === orderId || o.id === orderId);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], ...updates };
    setLocalData(STORAGE_KEYS.ORDERS, orders);
  }
  return true;
};

// ----------------------------------------------------
// STORE SETTINGS SERVICE
// ----------------------------------------------------
export const getSettingsService = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'store');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...INITIAL_SETTINGS, ...docSnap.data() };
      }
    } catch (e) {
      console.warn('Firestore fetch error for settings:', e);
    }
  }
  return getLocalData(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
};

export const saveSettingsService = async (settingsData) => {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'settings', 'store'), settingsData, { merge: true });
    } catch (e) {
      console.error('Firestore settings save failed:', e);
    }
  }
  setLocalData(STORAGE_KEYS.SETTINGS, settingsData);
  return settingsData;
};
