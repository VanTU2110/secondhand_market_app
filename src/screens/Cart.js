import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { useCart } from '../contexts/CartContext'; // Import the hook to use cart context
import BottomNavigation from '../component/bottomNavigation';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    addToCart({ _id: productId });
  };

  const handleClearCart = () => {
    clearCart();
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <View style={styles.itemRow}>
              <Image source={{ uri: item.img_url[0] }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)} ₫</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleDecreaseQuantity(item._id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={String(item.quantity)}
                    keyboardType="numeric"
                    editable={false} // Không cho phép chỉnh sửa số lượng trực tiếp
                  />
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(item._id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item._id)}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {formatPrice(calculateTotal())} ₫</Text>
        <TouchableOpacity onPress={() => alert('Proceed to checkout')} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
    <BottomNavigation></BottomNavigation>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  itemRow: {
    flexDirection: 'row', // Hiển thị nội dung ngang hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10, // Khoảng cách giữa ảnh và thông tin
  },
  itemDetails: {
    flex: 1, // Chiếm phần còn lại của không gian
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Cart;
