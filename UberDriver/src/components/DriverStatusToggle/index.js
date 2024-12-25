import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Thay bằng file cấu hình Firebase của bạn
import {useDispatch, useSelector} from "react-redux";

const DriverStatusToggle = () => {
  const dispatch = useDispatch();
  const driverId = useSelector((state) => state.auth.user_id);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy trạng thái hiện tại của tài xế khi component được tải
  useEffect(() => {
    const fetchDriverStatus = async () => {
      try {
        const driverDoc = doc(db, 'drivers', driverId);
        const docSnap = await getDoc(driverDoc);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setIsOnline(docSnap.data().isAvailable);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching driver status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverStatus();

    // Theo dõi sự thay đổi trạng thái trong Firestore
    const unsubscribe = onSnapshot(doc(db, 'drivers', driverId), (docSnap) => {
      if (docSnap.exists()) {
        setIsOnline(docSnap.data().isAvailable);
      }
    });

    // Cleanup khi component bị hủy
    return () => unsubscribe();
  }, [driverId]);

  // Hàm xử lý khi tài xế thay đổi trạng thái
  const handleToggle = async () => {
    try {
      setIsOnline((prevState) => !prevState);
      const driverDoc = doc(db, 'drivers', driverId);
      await updateDoc(driverDoc, { isAvailable: !isOnline });
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Trạng thái: {isOnline ? 'Sẵn sàng nhận đơn' : 'Không sẵn sàng'}
      </Text>
      <Switch
        value={isOnline}
        onValueChange={handleToggle}
        trackColor={{ false: '#767577', true: '#4CAF50' }}
        thumbColor={isOnline ? '#fff' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DriverStatusToggle;
