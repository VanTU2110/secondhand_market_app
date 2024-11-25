import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart context to children
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productId) {
          // Giảm số lượng nếu lớn hơn 1, nếu bằng 1 sẽ xóa sản phẩm khỏi giỏ hàng
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;  // Trả về null để xóa sản phẩm
          }
        }
        return item;
      }).filter(item => item !== null);  // Lọc bỏ những sản phẩm null (đã bị xóa)
      
      return updatedCart;
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart ,decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
