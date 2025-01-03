import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore"; // Firebase Firestore
import { db } from "../../../firebaseConfig";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const TripHistoryScreen = () => {
  const userId = useSelector((state) => state.auth.user_id);
  const ride = useSelector((state) => state.app.ride);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  const convertTimestampToDate = (prop) => {
    if (!prop) return null;
    const { seconds, nanoseconds } = prop;
    if (seconds === undefined || nanoseconds === undefined) return null;
    return new Date(seconds * 1000 + nanoseconds / 1000000); // Chuyển giây + nano thành milliseconds
  };
  useEffect(() => {

  }, [ride]);

  useEffect(() => {
    console.log("đang gọi trip history với user :::", userId);
    const fetchTripHistory = async () => {
      try {
        const tripQuery = query(
          collection(db, "rides"),
          where("user_id", "==", userId), // Lọc user
          where("status", "==", "accepted") // Lọc 
        );
        const querySnapshot = await getDocs(tripQuery);
        const tripsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
            // Lặp qua từng trip và tìm giá trong collection "orders"
        const tripsWithPrices = await Promise.all(
          tripsData.map(async (trip) => {
            const orderQuery = query(
              collection(db, "orders"),
              where("rideId", "==", trip.id) // Truy vấn dựa trên trip.id
            );
            const orderSnapshot = await getDocs(orderQuery);

            // Lấy giá từ order (nếu có)
            const orderData = orderSnapshot.docs.map((doc) => doc.data());
            console.log("orderData::: ", orderData);
            const finalPrice = orderData[0]?.finalPrice || null; // Lấy giá từ order đầu tiên hoặc null
            const originalPrice = orderData[0]?.originalPrice || null; // Lấy giá từ order đầu tiên hoặc null
            const paymentMethod = orderData[0]?.paymentMethod || null; // Lấy giá từ order đầu tiên hoặc null
            const discountCode = orderData[0]?.discountCode || null; // Lấy giá từ order đầu tiên hoặc null
            const price = orderData[0]?.discountCode || null; // Lấy giá từ order đầu tiên hoặc null
            return {
              ...trip,
              finalPrice, // Thêm giá vào trip
              originalPrice,
              paymentMethod,
              discountCode
            };
          })
        );

        setTrips(tripsWithPrices); // Cập nhật trips với giá
      } catch (error) {
        console.error("Error fetching trip history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripHistory();
  }, [userId]);

  const handleTripPress = (trip) => {
    navigation.navigate("TripDetailScreen", { trip });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTripPress(item)} style={styles.tripItem}>
      {/* <Text style={styles.location}>{`Mã chuyến đi : ${item.id}`}</Text> */}
      <View style={styles.dateRow}>
        <Text style={[styles.date, styles.createdAt]}>{`${moment(convertTimestampToDate(item.createdAt)).format("DD/MM/YYYY HH:mm")}`}</Text> 
        <Text style={[styles.date, styles.acceptedAt]}>{`${moment(convertTimestampToDate(item.acceptedAt)).format("DD/MM/YYYY HH:mm")}`}</Text> 
      </View>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/bike-1.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.location} 
            numberOfLines={1} // Giới hạn hiển thị thành 1 dòng
            ellipsizeMode="tail">
              {`Từ: ${item.start_location.name}`}</Text>
          <Text style={styles.location}
            numberOfLines={1} // Giới hạn hiển thị thành 1 dòng
            ellipsizeMode="tail">
              {`Đến: ${item.end_location.name}`}
          </Text>
        </View>
        
      </View>
      <Text style={styles.price}>{`Giá: ${item.finalPrice}đ`}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử chuyến đi</Text>
      {trips.length === 0 ? (
        <Text style={styles.emptyMessage}>Bạn chưa có chuyến đi nào!</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
    padding: 10, 
  }, 
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10, 
  }, 
  tripItem: { 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    elevation: 2, 
  }, 
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  location: { 
    fontSize: 14, 
    marginBottom: 5, 
  }, 
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  date: { 
    fontSize: 14, 
    color: "gray", 
  }, 
  createdAt: {
    backgroundColor: "#fdecea",
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  acceptedAt: {
    backgroundColor: "#eafbee",
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  price: { 
    marginLeft: 60,
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#4caf50", 
  }, 
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  emptyMessage: { 
    textAlign: "center", 
    fontSize: 18, 
    color: "gray", 
  }, 
}); 

export default TripHistoryScreen;
