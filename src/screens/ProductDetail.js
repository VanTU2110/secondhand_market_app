import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../component/bottomNavigation";
import Header from "../component/Header";
import { useCart } from "../contexts/CartContext"; // Import useCart to access the cart context

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart(); // Get addToCart function from the context

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.img_url[0] }} style={styles.image} />

        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <Text style={styles.shopName}>{product.shop_id.shop_name}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.category}>Danh mục: {product.category_id.category_name}</Text>
          <Text style={styles.description}>Mô tả: {product.description}</Text>
          <Text style={styles.condition}>
            Tình trạng: {product.condition === "used" ? "Đã qua sử dụng" : "Mới"}
          </Text>
          <Text style={styles.price}>Giá: {formatPrice(product.price)} ₫</Text>
          <Text style={styles.quantity}>Số lượng có sẵn: {product.quantity}</Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(product)} // Call addToCart from the context
        >
          <Icon name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: "contain",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  condition: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5555",
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
});

export default ProductDetail;