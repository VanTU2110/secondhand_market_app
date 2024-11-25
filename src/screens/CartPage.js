import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCart } from '../contexts/cartContext';  // Import useCart để lấy giỏ hàng

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();  // Dùng cart từ context

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);  // Xóa sản phẩm khỏi giỏ hàng
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
            <Text>₫{item.price.toLocaleString()}</Text>
            <Button title="Xóa" onPress={() => handleRemoveFromCart(item._id)} />
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <Button title="Xóa tất cả" onPress={clearCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productItem: {
    marginBottom: 15,
  },
});

export default CartPage;
