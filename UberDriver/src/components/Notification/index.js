import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateNotification } from "../../redux/slices/app";
import updateNotificationStatus from "../../utils/updateNotificationStatus";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import getDistance from "../../utils/getDistance";
const Notification = () => {
  const dispatch = useDispatch();
  const { notification_id, ride, driver_location,order,timeForResponse } = useSelector(
    (state) => state.app
  );
  const { user_id } = useSelector(
    (state) => state.auth
  );
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>Chuyến xe mới!</Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>
              Điểm đón:{ride?.pickUpLocation.name}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Điểm đến:{ride?.dropOffLocation.name}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Khoảng cách từ bạn tới điểm đón:
              {getDistance(
                driver_location?.latitude,
                driver_location?.longitude,
                ride?.pickUpLocation.coordinate.latitude,
                ride?.pickUpLocation.coordinate.longitude
              )}{" "}
              km
            </Text>
            <Text style={{ fontSize: 18 }}>Giá cước:{order?.finalPrice}</Text>
          </View>
          <Text style={styles.message}>Vui lòng phản hồi trong</Text>
          <View>
            <CountdownCircleTimer
              isPlaying
              duration={timeForResponse} // Thời gian đếm ngược
              colors={["#004777", "#F7B801", "#A30000", "#189d00"]}
              colorsTime={[10, 7, 5, 0]} // Màu sắc theo thời gian
              size={80}
              onComplete={() => {
                dispatch(updateNotification(null));
                updateNotificationStatus(notification_id, "rejected",user_id);
              }} // Hành động khi kết thúc
            >
              {({ remainingTime }) => <Text>{remainingTime} giây</Text>}
            </CountdownCircleTimer>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => {
                updateNotificationStatus(notification_id, "rejected",user_id);
                dispatch(updateNotification(null));
              }}
            >
              <Text style={styles.buttonText}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => {
                updateNotificationStatus(notification_id, "accepted",user_id);
                dispatch(updateNotification(null));
              }}
            >
              <Text style={styles.buttonText}>Nhận chuyến</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Bao phủ toàn bộ chiều rộng màn hình
    height: "100%", // Bao phủ toàn bộ chiều cao màn hình
  },
  alertContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "red",
  },
  acceptButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default Notification;
