import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import url from '../../ipconfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderDetailScreen = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { orderId } = route.params; // Nhận orderId từ route params

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${url}/api/orders/getOrderbyID/${orderId}`);
        setOrderDetail(response.data);
      } catch (error) {
        setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="exclamation-circle" size={30} color="red" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!orderDetail) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu cho đơn hàng này.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.orderTitle}>Mã đơn hàng: {orderDetail._id}</Text>

      {/* Thông tin người mua */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin người mua</Text>
        <Text>Email: {orderDetail.buyer_id.email}</Text>
      </View>

      {/* Thông tin cửa hàng */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin cửa hàng</Text>
        <Text>Tên cửa hàng: {orderDetail.shop_id.shop_name}</Text>
        <Text>Địa chỉ: {orderDetail.shop_id.shop_address}</Text>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
        <FlatList
          data={orderDetail.cart}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              {item.img_url && item.img_url.length > 0 && (
                <Image source={{ uri: item.img_url[0] }} style={styles.productImage} />
              )}
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartText}>{item.title}</Text>
                <Text style={styles.cartSubText}>Số lượng: {item.quantity}</Text>
                <Text style={styles.cartSubText}>Giá: {item.price.toLocaleString()} VND</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Tổng giá trị và trạng thái */}
      <View style={styles.card}>
        <Text style={styles.totalPrice}>Tổng giá trị: {orderDetail.total_price.toLocaleString()} VND</Text>
        <Text style={[styles.status, { color: orderDetail.status === 'completed' ? 'green' : 'red' }]}>
          Trạng thái: {orderDetail.status}
        </Text>
        <Text style={[styles.paymentStatus, { color: orderDetail.payment_status === 'paid' ? 'green' : 'red' }]}>
          Trạng thái thanh toán: {orderDetail.payment_status}
        </Text>
        <Text style={styles.orderDate}>Ngày đặt: {new Date(orderDetail.order_date).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  orderTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#7f8c8d' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#95a5a6' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#34495e' },
  cartItem: { flexDirection: 'row', marginBottom: 15, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 8 },
  productImage: { width: 80, height: 80, borderRadius: 5 },
  cartItemDetails: { marginLeft: 15, flex: 1 },
  cartText: { fontSize: 16, fontWeight: 'bold' },
  cartSubText: { fontSize: 14, color: '#7f8c8d' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#27ae60' },
  status: { fontSize: 16, marginTop: 5 },
  paymentStatus: { fontSize: 16, marginTop: 5 },
  orderDate: { fontSize: 14, color: '#95a5a6' },
});

export default OrderDetailScreen;
