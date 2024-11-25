// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useCart } from '../contexts/cartContext';
import ProductItem from '../component/ProductItem';
import Header from '../component/Header';
import BottomNavigation from '../component/BottomNavigation';
import url from '../ipconfig';

const Home = ({ navigation }) => {
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(loading);
  

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
          <ProductItem product={item} onAddToCart={() => handleAddToCart(item)} />
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
    backgroundColor: '#f5f5f5', // Màu nền nhẹ nhàng, dễ nhìn
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Đảm bảo nền đồng nhất
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
    paddingTop: 15,
  },
});

export default Home;
