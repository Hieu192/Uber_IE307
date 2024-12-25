import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore"; // Firebase Firestore
import { db } from "../../../firebaseConfig";
import { useSelector } from "react-redux";

const TripHistoryScreen = () => {
  const userId = useSelector((state) => state.auth.user_id);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripHistory = async () => {
      try {
        const tripQuery = query(
          collection(db, "rides"),
          where("userId", "==", userId) // Lọc các chuyến đi của user
        );
        const querySnapshot = await getDocs(tripQuery);
        const tripsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trip history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripHistory();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.location}>{`Điểm đi: ${item.pickupLocation}`}</Text>
      <Text style={styles.location}>{`Điểm đến: ${item.dropoffLocation}`}</Text>
      <Text style={styles.date}>{`Ngày: ${item.date}`}</Text>
      <Text style={styles.price}>{`Giá: ${item.price.toLocaleString()}đ`}</Text>
    </View>
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
  location: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
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
