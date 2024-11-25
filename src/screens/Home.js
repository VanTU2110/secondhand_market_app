// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import ProductItem from '../component/ProductItem';
import Header from '../component/Header';
import BottomNavigation from '../component/bottomNavigation';
import url from '../../ipconfig';
import { TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/products/getAll`);
      setProducts(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert('Thành công', `${product.title} đã được thêm vào giỏ hàng.`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Chợ đồ cũ online" />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <ProductItem product={item} onAddToCart={() => handleAddToCart(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Nền trắng để tăng độ tương phản
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Nền dễ nhìn cho phần loading
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2D9CDB',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 90,
    paddingTop: 10,
    justifyContent: 'space-between', // Giữ khoảng cách đều giữa các phần tử
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15,
    marginHorizontal: 8,
    overflow: 'hidden',
    width: '45%', // Đảm bảo sản phẩm có độ rộng hợp lý
    elevation: 5, // Tạo bóng nhẹ cho các sản phẩm
  },
  productImage: {
    width: '100%',
    height: 180, // Kích thước hình ảnh sản phẩm
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Màu chữ dễ đọc
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#2D9CDB', // Màu chữ của giá sản phẩm
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28a745', // Màu xanh cho nút "Thêm vào giỏ hàng"
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Home;
