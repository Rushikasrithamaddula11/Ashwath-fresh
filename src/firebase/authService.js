import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

const LOCAL_USER_KEY = 'ashwath_current_user';
const DEMO_ADMIN_EMAIL = 'admin@ashwathfresh.com';
const DEMO_ADMIN_PASSWORD = 'admin123';

const createDemoAdminProfile = (email = DEMO_ADMIN_EMAIL) => ({
  uid: 'demo-admin-999',
  name: 'Store Admin',
  email,
  phone: '9346763478',
  role: 'admin',
  createdAt: new Date().toISOString()
});

export const registerCustomer = async ({ name, email, phone, password }) => {
  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      // Save customer profile in Firestore
      const userProfile = {
        uid: user.uid,
        name,
        email,
        phone,
        role: 'customer',
        createdAt: new Date().toISOString()
      };

      if (db) {
        await setDoc(doc(db, 'users', user.uid), userProfile);
      }

      return { user: { ...user, ...userProfile }, profile: userProfile };
    } catch (error) {
      console.error('Firebase signup error:', error);
      throw error;
    }
  } else {
    // Local demo signup mode
    const fakeUid = `user-${Date.now()}`;
    const userProfile = {
      uid: fakeUid,
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userProfile));
    return { user: userProfile, profile: userProfile };
  }
};

export const loginCustomer = async (email, password) => {
  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let profile = { role: 'customer' };
      if (db) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists()) {
          profile = docSnap.data();
        }
      }
      return { user, profile };
    } catch (error) {
      console.error('Firebase customer login error:', error);
      throw error;
    }
  } else {
    // Local demo login mode
    const userProfile = {
      uid: 'demo-customer-123',
      name: email.split('@')[0] || 'Demo Customer',
      email,
      phone: '9346763478',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userProfile));
    return { user: userProfile, profile: userProfile };
  }
};

export const loginAdmin = async (email, password) => {
  // Allow the configured store-admin credentials to work in both local and
  // Firebase-backed previews, without needing a matching Firebase account.
  if (email.trim().toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
    const adminProfile = createDemoAdminProfile(DEMO_ADMIN_EMAIL);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminProfile));
    return { user: adminProfile, profile: adminProfile };
  }

  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (db) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists() && docSnap.data().role === 'admin') {
          return { user, profile: docSnap.data() };
        } else {
          // If user logs in as admin, check if email matches admin default or throw error
          throw new Error('Unauthorized: Admin access required.');
        }
      }
      return { user, profile: { role: 'admin' } };
    } catch (error) {
      console.error('Firebase admin login error:', error);
      throw error;
    }
  } else {
    throw new Error('Invalid Admin Credentials. Default: admin@ashwathfresh.com / admin123');
  }
};

export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Logout error:', e);
    }
  }
  localStorage.removeItem(LOCAL_USER_KEY);
};

export const getCurrentLocalUser = () => {
  try {
    const saved = localStorage.getItem(LOCAL_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};
