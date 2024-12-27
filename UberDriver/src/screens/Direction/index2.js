import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, Dimensions } from "react-native";
import { MaterialIcons, Entypo } from "react-native-vector-icons";
import { useSelector } from "react-redux";
import MapView, { Polyline, Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

const MapboxNavigation = () => {
  const { direction } = useSelector((state) => state.app);
  const [turn, setTurn] = useState("straight");
  const [instruction, setInstruction] = useState("Đi thẳng");
  const [distance, setDistance] = useState(0);
  const [remainDistance, setRemainDistance] = useState(0);
  const [vehiclePosition, setVehiclePosition] = useState([direction.legs[0].start_location.lat, direction.legs[0].start_location.lng]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);  // Biến theo dõi bước hiện tại
  const [previousRemainDistance, setPreviousRemainDistance] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);
  console.log("direction là ",direction.legs[0].start_location.lat,direction.legs[0].start_location.lng)
  // Tính khoảng cách giữa hai điểm (Haversine formula)
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Bán kính Trái Đất (mét)
    const rad = Math.PI / 180; // Chuyển đổi từ độ sang radian
    const dLat = (lat2 - lat1) * rad;
    const dLng = (lng2 - lng1) * rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách theo mét
  }

  // Hàm xử lý chỉ dẫn
  function updateInstructions(current, steps) {
    let distance = 0;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      distance = calculateDistance(current[1], current[0], step.start_location.lat, step.start_location.lng);

      if (distance < 250 && distance > previousRemainDistance) {
        setTurn("straight");
        setRemainDistance(0);
        break;
      }

      if (distance < 200 && distance <= previousRemainDistance) {
        setInstruction(step.html_instructions);
        setTurn(step.maneuver);
        setRemainDistance(distance);
        setPreviousRemainDistance(distance);
        break;
      }
    }
  }

  // Giải mã polyline từ Google Maps (tạo mảng các tọa độ)
  function decodePolyline(encoded) {
    let points = [];
    let index = 0;
    let lat = 0, lng = 0;
    while (index < encoded.length) {
      let shift = 0, result = 0, b;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;
      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  }

  // Cập nhật vị trí phương tiện mỗi giây
//   useEffect(() => {
//     const polyline = direction.overview_polyline.points;
//     const decodedPolyline = decodePolyline(polyline);
//     setRouteCoordinates(decodedPolyline);
//     setDistance(direction.legs[0].distance.text);

//     // Tạo interval để mô phỏng di chuyển
//     const id = setInterval(() => {
//       setCurrentStep((prevStep) => {
//         if (prevStep < decodedPolyline.length - 1) {
//           const newStep = prevStep + 1;
//           setVehiclePosition(decodedPolyline[newStep]); // Cập nhật vị trí mới của phương tiện
//           return newStep;
//         } else {
//           clearInterval(id);
//           return prevStep;
//         }
//       });
//     }, 1000); // Cập nhật mỗi giây

//     setIntervalId(id);

//     return () => {
//       if (intervalId) clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
//     };
//   }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: direction.legs[0].start_location.lat,
          longitude: direction.legs[0].start_location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/* Vẽ polyline cho tuyến đường */}
        <Polyline
          coordinates={routeCoordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }))}
          strokeColor="#1489ff"
          strokeWidth={4}
        />
        
        {/* Marker cho phương tiện */}
        <Marker
          coordinate={{
            latitude: vehiclePosition[0],
            longitude: vehiclePosition[1],
          }}
        >
          <Entypo name="location-pin" size={30} color="red" />
        </Marker>
      </MapView>

      {/* Hiển thị chỉ dẫn di chuyển */}
      <View style={styles.directionContainer}>
        <View style={styles.direction}>
          {turn === "straight" && <Entypo name="arrow-long-up" size={50} color="white" />}
          {turn.includes("left") && <MaterialIcons name="turn-left" size={50} color="white" />}
          {turn.includes("right") && <MaterialIcons name="turn-right" size={50} color="white" />}
          <View style={{ padding: 10 }}>
            {remainDistance !== 0 && <Text style={{ color: "white", fontSize: 20 }}>{remainDistance} m</Text>}
            <Text style={{ color: "white", fontSize: 20 }}>{instruction}</Text>
          </View>
        </View>
      </View>

      {/* Thông tin chuyến đi */}
      <View style={styles.tripContainer}>
        <View style={styles.tripInfo}>
          <Text style={{ fontSize: 30, color: "#ff7402", fontWeight: "700" }}>{direction.legs[0].duration.text}</Text>
          <Text style={{ fontSize: 20, color: "#000000", fontWeight: "700" }}>{distance}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  directionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: "100%",
    position: "absolute",
    top: 150,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  direction: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#026d34",
    borderRadius: 10,
    width: "95%",
    height: 80,
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
    height: 80,
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
