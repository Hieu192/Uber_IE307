import { useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

const TripDetailScreen = ({ route }) => {
  console.log("in ra tham soos:::",route.params);  
  const {trip} = route.params; // Nhận tham số tripId
  console.log("in ra trip:::",trip);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Chi tiết chuyến đi</Text>

      {/* Mã chuyến đi */}
      <View style={styles.tripIdContainer}>
        <Text style={styles.tripId}>Mã chuyến đi: {trip.id}</Text>
      </View>

      {/* Thông tin thanh toán */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentHeader}>Thông tin thanh toán</Text>

        <View style={styles.paymentRow}>
          <Text style={styles.label}>Phương thức thanh toán:</Text>
          {/* <Text style={styles.value}>{trip.paymentMethod}</Text> */}
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.label}>Giá gốc:</Text>
          {/* <Text style={styles.value}>{`₫${trip.originalPrice.toLocaleString()}`}</Text> */}
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.label}>Mã giảm giá:</Text>
          <Text style={styles.value}>{trip?.discountCode || 'Không có'}</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.label}>Tổng tiền đã trả:</Text>
          {/* <Text style={styles.value}>{`₫${trip.totalPaid.toLocaleString()}`}</Text> */}
        </View>
      </View>

      {/* Địa điểm */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationHeader}>Địa điểm</Text>

        {/* Địa điểm đón */}
        <View style={styles.locationRow}>
          <Text style={styles.label}>Điểm đón:</Text>
          {/* <Text style={styles.location}>{trip.startLocation.name}</Text> */}
        </View>

        {/* Địa điểm đến */}
        <View style={styles.locationRow}>
          <Text style={styles.label}>Điểm đến:</Text>
          {/* <Text style={styles.location}>{trip.endLocation.name}</Text> */}
        </View>

        {/* Hiển thị bản đồ với địa điểm đón và đến */}
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: trip.startLocation.latitude,
            longitude: trip.startLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: trip.startLocation.latitude, longitude: trip.startLocation.longitude }} />
          <Marker coordinate={{ latitude: trip.endLocation.latitude, longitude: trip.endLocation.longitude }} />
        </MapView> */}
      </View>
           {/* Tài xế */}
           <View style={styles.driverContainer}>
        <Text style={styles.driverHeader}>Thông tin tài xế</Text>

        <View style={styles.driverRow}>
          <Text style={styles.label}>Tên tài xế:</Text>
          {/* <Text style={styles.value}>{trip.driver.name}</Text> */}
        </View>

        <View style={styles.driverRow}>
          <Text style={styles.label}>Đánh giá:</Text>
          {/* <Text style={styles.value}>{trip.driver.rating} ⭐</Text> */}
        </View>

        <View style={styles.driverRow}>
          <Text style={styles.label}>Phương tiện:</Text>
          {/* <Text style={styles.value}>{trip.driver.vehicle}</Text> */}
        </View>

        <View style={styles.driverRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          {/* <Text style={styles.value}>{trip.driver.phone}</Text> */}
        </View>
      </View>

      {/* Ngày tháng chuyến đi */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {/* {`Ngày chuyến đi: ${moment(trip.creat).format('DD/MM/YYYY HH:mm')}`} */}
        </Text>
      </View>
      <TouchableOpacity onPress={() => null }>
        <Text style={styles.reset}>Đặt lại </Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tripIdContainer: {
    marginBottom: 20,
  },
  tripId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  paymentContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  paymentHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  locationRow: {
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  reset: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
  },
  driverContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  driverHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default TripDetailScreen;