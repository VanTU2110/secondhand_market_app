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
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.img_url[0] }} style={styles.image} />

    
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.shopName}>Shop: {product.shop_id.shop_name}</Text>
        <Text style={styles.categoryName}>Danh mục: {product.category_id.category_name.trim()}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Giá: {formatPrice(product.price)} đ</Text>
        <Text style={styles.quantity}>Số lượng còn: {product.quantity}</Text>
      </View>

      {/* Nút thêm vào giỏ hàng */}
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
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  shopName: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  iconText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductItem;
