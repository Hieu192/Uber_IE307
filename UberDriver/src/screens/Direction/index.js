import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, Dimensions, Pressable,Linking } from "react-native";
import { WebView } from "react-native-webview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";


const MapboxNavigation = ({navigation}) => {
  const webviewRef = useRef(null);
  const { direction } = useSelector((state) => state.app);
  const [turn, setTurn] = useState("straight");
  const [instruction, setInstruction] = useState("Đi thẳng");
  const [distance, setDistance] = useState(0);
  const [remainDistance, setRemainDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousRemainDistance, setPreviousRemainDistance] = useState(-1);
  const [intervalId, setIntervalId] = useState(null); // Lưu lại ID của interval
  const [timeoutIds, setTimeoutIds] = useState([]); // Lưu lại các ID của setTimeout
  function convertTime(seconds) {
    // Tính số phút và phần dư giây
    const minutes = Math.floor(seconds / 60);
    // Tính số giờ và phần dư phút
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Trả về kết quả
    if (hours > 0) {
      return `${hours} giờ ${remainingMinutes} phút`;
    } else {
      return `${remainingMinutes} phút`;
    }
  }
  console.log(
    "----------------------------------------------------------------"
  );
  const removeRouteFromExpo = () => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript("window.removeRoute();"); // Gọi hàm removeRoute() từ HTML
    }
  };
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Bán kính Trái Đất (mét)
    const rad = Math.PI / 180; // Chuyển đổi từ độ sang radian
    const dLat = (lat2 - lat1) * rad;
    const dLng = (lng2 - lng1) * rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) *
        Math.cos(lat2 * rad) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách theo mét
  }
  // Hàm xử lý chỉ dẫn
  function updateInstructions(current, steps) {
    let distance = 0;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      distance = calculateDistance(
        current[1],
        current[0], // Latitude và Longitude hiện tại
        step.start_location.lat,
        step.start_location.lng // Latitude và Longitude ngã rẽ
      );

      if (distance > 250) {
        //console.log("còn cách xa vị trí rẽ")
      }
      if (distance < 250 && distance > previousRemainDistance) {
        setPreviousRemainDistance(distance);
        setTurn("straight");
        setRemainDistance(0);
        break;
      }
      if (distance < 200 && distance <= previousRemainDistance) {
        setInstruction(step.html_instructions);
        setTurn(step.maneuver);
        setRemainDistance(distance.toFixed(0));
        setPreviousRemainDistance(distance);
        break; // Dừng kiểm tra, ưu tiên ngã rẽ gần nhất
      }
    }
  }
  const makePhoneCall = () => {
    const phoneNumber = 'tel:+0842240800'; // Thay bằng số điện thoại bạn muốn gọi
    Linking.openURL(phoneNumber);
  };
  useEffect(() => {
    setDistance(direction.legs[0].distance.text);
    setDuration(direction.legs[0].duration.text);
  }, []);
  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={require("./index.html")}
        style={{ flex: 1 }}
        injectedJavaScript={`
           const origin = [${direction.legs[0].start_location.lng},${direction.legs[0].start_location.lat}];
         const destination = [${direction.legs[0].end_location.lng},${direction.legs[0].end_location.lat}];
         const polyline="${direction.overview_polyline.points}";
          window.initMapWithData(origin, destination,polyline); // Gọi hàm trong HTML để khởi tạo dữ liệu
              // Tìm và ẩn thanh điều khiển "Traffic, Driving, Cycling"
    const controlElement = document.querySelector('.mapboxgl-ctrl-mapbox-traffic');
    if (controlElement) {
      controlElement.style.display = 'none'; // Ẩn phần tử
    }

    // Tìm và ẩn các điều khiển khác nếu cần thiết
    const otherControlElement = document.querySelector('.mapboxgl-ctrl');
    if (otherControlElement) {
      otherControlElement.style.display = 'none'; // Ẩn các điều khiển khác
    }
        `}
        onMessage={(event) => {
          const data = event.nativeEvent.data;
          const { current } = JSON.parse(data);
          updateInstructions(JSON.parse(data).current, direction.legs[0].steps);
        }}
      />
      <View style={styles.directionContainer}>
        <View style={styles.direction}>
          {turn === "straight" && (
            <Entypo name="arrow-long-up" size={50} color="white" />
          )}
          {turn.includes("left") && (
            <MaterialIcons name="turn-left" size={50} color="white" />
          )}
          {turn.includes("right") && (
            <MaterialIcons name="turn-right" size={50} color="white" />
          )}

          <View style={{ padding: 10 }}>
            {remainDistance !== 0 && (
              <Text style={{ color: "white", fontSize: 20 }}>
                {remainDistance} m
              </Text>
            )}
            <Text style={{ color: "white", fontSize: 20 }}>{instruction}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tripContainer}>
        <View style={styles.tripInfo}>
          <Text style={{ fontSize: 30, color: "#ff7402", fontWeight: "700" }}>
            {duration}
          </Text>
          <Text style={{ fontSize: 20, color: "#000000", fontWeight: "700" }}>
            {distance}
          </Text>
        </View>
      </View>
      <Pressable onPress={makePhoneCall} style={{position:"absolute",bottom:150,right:20}}>
        <View style={{ backgroundColor: "#1ba300",  borderRadius: 35,width:70,height:70,alignItems:"center",justifyContent:"center", }}>
        <Entypo name="phone" size={40} color="white" />
        </View>
      </Pressable>
      <Button
        title="Dừng mô phỏng"
        onPress={() => {
          removeRouteFromExpo();
          navigation.navigate("Home")
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    position: "relative",
  },
  directionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: "100%",
    position: "absolute",
    top: 10,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  tripContainer: {
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    height: 80,
  },
  direction: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#026d34",
    borderRadius: 10,
    width: "95%",
    height: 100,
  },
  tripInfo: {
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapboxNavigation;
