import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Hàm định dạng giá tiền
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: product.img_url[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.categoryName}>Danh mục: {product.category_id.category_name.trim()}</Text>
        <Text style={styles.price}>Giá: {formatPrice(product.price)} đ</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onAddToCart(product)}>
        <Icon name="cart-outline" size={24} color="#fff" />
        <Text style={styles.iconText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  iconContainer: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconText: {
    marginLeft: 6,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProductItem;
