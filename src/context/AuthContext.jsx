import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {
  registerCustomer,
  loginCustomer,
  loginAdmin,
  logoutUser,
  getCurrentLocalUser
} from '../firebase/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'customer' | 'admin' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            if (db) {
              const docSnap = await getDoc(doc(db, 'users', user.uid));
              if (docSnap.exists()) {
                const data = docSnap.data();
                setCurrentUser({ ...user, ...data });
                setUserRole(data.role || 'customer');
              } else {
                setCurrentUser(user);
                setUserRole('customer');
              }
            } else {
              setCurrentUser(user);
              setUserRole('customer');
            }
          } catch (e) {
            console.error('Error fetching user profile in auth state change:', e);
            setCurrentUser(user);
            setUserRole('customer');
          }
        } else {
          setCurrentUser(null);
          setUserRole(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local fallback auth check
      const localUser = getCurrentLocalUser();
      if (localUser) {
        setCurrentUser(localUser);
        setUserRole(localUser.role || 'customer');
      }
      setLoading(false);
    }
  }, []);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await registerCustomer(userData);
      setCurrentUser(res.user);
      setUserRole('customer');
      return res;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (email.trim().toLowerCase() === 'admin@ashwathfresh.com' && password === 'admin123') {
        const res = await loginAdmin(email, password);
        setCurrentUser(res.user);
        setUserRole('admin');
        return res;
      }

      const res = await loginCustomer(email, password);
      setCurrentUser(res.user);
      setUserRole('customer');
      return res;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAdmin(email, password);
      setCurrentUser(res.user);
      setUserRole('admin');
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    userRole,
    isAdmin: userRole === 'admin',
    isCustomer: userRole === 'customer',
    loading,
    signup,
    login,
    adminLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
