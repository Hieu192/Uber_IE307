import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import CreateRide, { deleteDocuments } from "../../components/CreateRide";
import { useSelector, useDispatch } from "react-redux";
import RippleDot from "../../components/RippleDot";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import CancelTrip from "../../components/CancelTrip";
import { Avatar } from "react-native-elements";
import MapFindDriver from "./MapFindDriver";
const FindDriver = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, ride, driver } = useSelector((state) => state.app);
  const route = useRoute();
  const { originPlace, destinationPlace } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalĐriverVisible, setModalDriverVisible] = useState(true);
  const [backPressHandled, setBackPressHandled] = useState(false); // Thêm state để theo dõi nếu đã nhấn nút back

  useEffect(() => {
     //deleteDocuments('rides', 20);
   // CreateRide(originPlace.value, destinationPlace.value, dispatch);
  }, []);

  const showAlert = () => {
    Alert.alert(
      "Xác nhận hủy chuyến", // Tiêu đề
      "Bạn có chắc chắn muốn tiếp tục?", // Nội dung
      [
        {
          text: "Không", // Nút No
          style: "cancel",
        },
        {
          text: "Có", // Nút Yes
          onPress: () => {
            setModalVisible(true);
            CancelTrip(ride);
          },
        },
      ],
      { cancelable: false } // Không cho phép đóng bằng cách nhấn ra ngoài
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        if (!backPressHandled) {
          e.preventDefault(); // Ngừng hành động quay lại mặc định
          Alert.alert(
            "Bạn có chắc muốn quay lại?",
            "Chuyến xe sẽ bị hủy nếu bạn rời khỏi màn hình?",
            [
              { text: "Hủy", style: "cancel", onPress: () => {} },
              {
                text: "OK",
                onPress: () => {
                  setBackPressHandled(true); // Đánh dấu đã xử lý back
                  navigation.dispatch(e.data.action); // Thực hiện điều hướng nếu người dùng đồng ý
                  CancelTrip(ride);
                },
              },
            ]
          );
        } else {
          e.preventDefault(); // Ngừng lại nếu back đã được xử lý
        }
      });
      // Cleanup listeners khi component unmount
      return () => {
        unsubscribe(); // Cleanup navigation listener
      };
    }, [navigation, backPressHandled]) // Thêm backPressHandled vào dependency array
  );

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <Modal
          animationType="slide" // Kiểu animation: 'slide', 'fade', hoặc 'none'
          transparent={true} // Cho phép modal hiển thị trong suốt
          visible={modalĐriverVisible}
          onRequestClose={() => setModalDriverVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalDriverVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Avatar
                  rounded
                  size="large"
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/41.jpg",
                  }}
                />
                <Text style={styles.modalText}>
                  Tài xế {driver?.fullname} đã nhận chuyến xe của bạn
                </Text>
                <Text style={styles.modalText}>
                  Biển số {driver?.license_plate}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setModalDriverVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        <View style={{ flex: 1, width: Dimensions.get("window").width, }}>
          <View style={{ flex: 4 , width: Dimensions.get("window").width, }}>
            <MapFindDriver origin={originPlace}/>
          </View>
          <View style={styles.container1}>
            <Text style={{ fontSize: 20 }}>
              Hệ thống đang tìm tài xế phù hợp{" "}
            </Text>
            <RippleDot />
            <TouchableOpacity onPress={showAlert}>
              <Text
                style={{
                  padding: "10",
                  fontSize: 20,
                  borderRadius: 10,
                  backgroundColor: "#ff3838",
                  color: "white",
                  marginTop: 20,
                }}
              >
                Hủy chuyến
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal
        animationType="slide" // Kiểu animation: 'slide', 'fade', hoặc 'none'
        transparent={false} // Cho phép modal hiển thị trong suốt
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn nút Back (Android)
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Chuyến xe đã được hủy!</Text>
            <Text style={styles.modalText}>Điều hướng về trang chủ sau</Text>
            <View>
              <CountdownCircleTimer
                isPlaying
                duration={3} // Thời gian đếm ngược
                colors={["#004777", "#F7B801", "#A30000", "#189d00"]}
                colorsTime={[3, 2, 1, 0]} // Màu sắc theo thời gian
                size={80}
                onComplete={() => navigation.navigate("Home")} // Hành động khi kết thúc
              >
                {({ remainingTime }) => <Text>{remainingTime} giây</Text>}
              </CountdownCircleTimer>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.textStyle}>Quay về trang chủ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  container1 : {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: 'white'
  },
  spinnerTextStyle: {
    color: "#1fff1f",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền trong suốt
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FindDriver;
