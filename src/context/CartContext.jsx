import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'ashwath_cart_items';

export const MINIMUM_ORDER_VALUE = 200;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error writing cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            unit: product.unit || 'Kg',
            weight: product.weight || '',
            imageUrl: product.imageUrl,
            category: product.category,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Cart calculations
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery charge rule (e.g. Free delivery on orders >= 300, else 20 delivery charge)
  const deliveryCharge = subtotal > 0 && subtotal < 300 ? 25 : 0;

  const totalAmount = subtotal + deliveryCharge;

  // Validation
  const meetsMinimumOrder = subtotal >= MINIMUM_ORDER_VALUE;
  const amountNeededForMinimum = Math.max(0, MINIMUM_ORDER_VALUE - subtotal);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    subtotal,
    deliveryCharge,
    totalAmount,
    minimumOrderValue: MINIMUM_ORDER_VALUE,
    meetsMinimumOrder,
    amountNeededForMinimum
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
