import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { useCart } from '../contexts/CartContext'; // Import the hook to use cart context

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity } = useCart();
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);  // Giảm số lượng khi người dùng nhấn giảm
  };

  const handleIncreaseQuantity = (productId) => {
    addToCart({ _id: productId });  // Tăng số lượng khi người dùng nhấn tăng
  };

  const handleClearCart = () => {
    clearCart();
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <Image source={{ uri: item.img_url[0] }} style={styles.Itemimage} />
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)} ₫</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleDecreaseQuantity(item._id)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.quantityInput}
                value={String(item.quantity)}
                onChangeText={(text) => handleQuantityChange(item._id, parseInt(text))}
                keyboardType="numeric"
                editable={false}  // Không cho phép chỉnh sửa số lượng trực tiếp
              />

              <TouchableOpacity onPress={() => handleIncreaseQuantity(item._id)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => handleRemoveFromCart(item._id)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
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
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemImage: {
    width: 100,
    height: 100, 
    resizeMode: 'cover',  
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
