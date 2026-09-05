import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getProductsService,
  saveProductService,
  deleteProductService,
  getCategoriesService,
  saveCategoryService,
  deleteCategoryService,
  getOrdersService,
  createOrderService,
  updateOrderStatusService,
  getSettingsService,
  saveSettingsService,
  seedDatabase
} from '../firebase/storeService';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../firebase/seedData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load all initial store data
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodsData, catsData, ordersData, settingsData] = await Promise.all([
        getProductsService(),
        getCategoriesService(),
        getOrdersService(),
        getSettingsService()
      ]);

      setProducts(prodsData || INITIAL_PRODUCTS);
      setCategories(catsData || INITIAL_CATEGORIES);
      setOrders(ordersData || []);
      setSettings(settingsData || INITIAL_SETTINGS);
    } catch (err) {
      console.error('Error refreshing store data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Product Actions
  const addOrUpdateProduct = async (productData) => {
    const saved = await saveProductService(productData);
    await refreshData();
    return saved;
  };

  const deleteProduct = async (productId) => {
    await deleteProductService(productId);
    await refreshData();
  };

  const toggleProductActive = async (productId, currentActive) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      await saveProductService({ ...prod, active: !currentActive });
      await refreshData();
    }
  };

  const toggleProductFeatured = async (productId, currentFeatured) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      await saveProductService({ ...prod, featured: !currentFeatured });
      await refreshData();
    }
  };

  // Category Actions
  const addOrUpdateCategory = async (categoryData) => {
    const saved = await saveCategoryService(categoryData);
    await refreshData();
    return saved;
  };

  const deleteCategory = async (categoryId) => {
    await deleteCategoryService(categoryId);
    await refreshData();
  };

  // Order Actions
  const placeOrder = async (orderData) => {
    const created = await createOrderService(orderData);
    await refreshData();
    return created;
  };

  const updateOrderStatus = async (orderId, orderStatus, paymentStatus) => {
    await updateOrderStatusService(orderId, orderStatus, paymentStatus);
    await refreshData();
  };

  // Settings Action
  const updateSettings = async (newSettings) => {
    const updated = await saveSettingsService(newSettings);
    setSettings(updated);
    return updated;
  };

  // Seed Action
  const triggerSeedDatabase = async () => {
    const res = await seedDatabase();
    await refreshData();
    return res;
  };

  // Sales Analytics Helper
  const calculateSalesAnalytics = (timeframe = 'today', customStartDate = null, customEndDate = null) => {
    const now = new Date();
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    if (timeframe === 'yesterday') {
      startDate.setDate(now.getDate() - 1);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      const filtered = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= startDate && d <= endDate;
      });
      return formatAnalyticsResult(filtered);
    } else if (timeframe === '7days') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeframe === 'month') {
      startDate.setDate(1);
    } else if (timeframe === 'custom' && customStartDate && customEndDate) {
      startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      endDate.setHours(23, 59, 59, 999);
      const filtered = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= startDate && d <= endDate;
      });
      return formatAnalyticsResult(filtered);
    }

    const filtered = orders.filter(o => new Date(o.createdAt) >= startDate);
    return formatAnalyticsResult(filtered);
  };

  const formatAnalyticsResult = (filteredOrders) => {
    const totalSales = filteredOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
    const totalOrders = filteredOrders.length;
    const deliveredOrders = filteredOrders.filter(o => o.orderStatus === 'Delivered').length;
    const cancelledOrders = filteredOrders.filter(o => o.orderStatus === 'Cancelled').length;
    const codOrders = filteredOrders.filter(o => o.paymentMethod === 'COD').length;
    const productsSold = filteredOrders.reduce((sum, o) => {
      const itemsCount = (o.items || []).reduce((iSum, i) => iSum + (Number(i.quantity) || 1), 0);
      return sum + itemsCount;
    }, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    return {
      totalSales,
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      codOrders,
      productsSold,
      avgOrderValue,
      orders: filteredOrders
    };
  };

  // Filtered Products for Customer view
  const filteredProducts = products.filter(product => {
    if (!product.active) return false;

    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' ||
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const value = {
    products,
    filteredProducts,
    categories,
    orders,
    settings,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    refreshData,
    addOrUpdateProduct,
    deleteProduct,
    toggleProductActive,
    toggleProductFeatured,
    addOrUpdateCategory,
    deleteCategory,
    placeOrder,
    updateOrderStatus,
    updateSettings,
    triggerSeedDatabase,
    calculateSalesAnalytics
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
