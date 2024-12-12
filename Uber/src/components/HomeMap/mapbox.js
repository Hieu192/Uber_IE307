import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { WebView } from "react-native-webview";

const MapboxNavigation = () => {
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"></script>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css"
    type="text/css"
  />
      <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
       mapboxgl.accessToken = 'pk.eyJ1IjoicGh1Y2NhbzEyMyIsImEiOiJjbTRqODlueHMwYWx0MnFvazZiajk0NmtkIn0.AO_5CNYWhNB0Qu43ZMQ0tA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [106.660172, 10.762622], // Vị trí trung tâm ban đầu (TP.HCM)
  zoom: 15,
  pitch: 45, // Góc nghiêng bản đồ
  bearing: 0, // Hướng bản đồ
});

// Thêm các điều khiển Navigation
const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

// Khởi tạo Mapbox Directions
const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
     controls: {
      
            instructions: false // Ẩn danh sách hướng dẫn
          }
});
map.addControl(directions, 'top-left');

// Tạo phần tử đại diện cho phương tiện
const vehicleElement = document.createElement('div');
vehicleElement.style.width = '40px';
vehicleElement.style.height = '40px';
vehicleElement.style.backgroundImage = "url('https://img.icons8.com/ios-filled/50/000000/up.png')";
vehicleElement.style.backgroundSize = 'cover';
vehicleElement.style.transformOrigin = 'center';
vehicleElement.style.transform = 'rotate(180deg)'; // Mũi tên luôn hướng lên

const vehicleMarker = new mapboxgl.Marker({
  element: vehicleElement,
}).setLngLat([106.660172, 10.762622]).addTo(map);

// Hàm tính khoảng cách giữa 2 tọa độ (hàm Haversine)
function getDistance(userLocation, stepLocation) {
  const R = 6371000; // Bán kính trái đất tính bằng mét
  const lat1 = userLocation[1] * Math.PI / 180;
  const lon1 = userLocation[0] * Math.PI / 180;
  const lat2 = stepLocation[1] * Math.PI / 180;
  const lon2 = stepLocation[0] * Math.PI / 180;

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Khoảng cách tính bằng mét
}

// Giải mã chuỗi polyline
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

    const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += deltaLng;

    points.push([lng / 1e5, lat / 1e5]); // Chú ý: Lat/Lng ngược vị trí
  }

  return points;
}

// Lắng nghe sự kiện 'route' để lấy thông tin về các tuyến đường và các bước điều hướng
directions.on('route', function (e) {
  const routes = e.route[0];
  const fullCoordinates = decodePolyline(routes.geometry);

  // Lấy tất cả bước điều hướng
  const steps = routes.legs[0].steps;

  let index = 0;

  // Mô phỏng di chuyển
  const interval = setInterval(() => {
    if (index < fullCoordinates.length - 1) {
      const current = fullCoordinates[index];
      const next = fullCoordinates[index + 1];

      // Cập nhật vị trí mũi tên
      vehicleMarker.setLngLat(current);

      // Tính góc quay (bearing) theo hướng tuyến đường
      const bearing = Math.atan2(
        next[0] - current[0], // Longitude
        next[1] - current[1]  // Latitude
      ) * (180 / Math.PI);

      // Xoay bản đồ theo hướng di chuyển
      map.easeTo({
        center: current,
        bearing: bearing, // Cập nhật hướng bản đồ
         zoom: 15, 
        pitch: 45, // Đảm bảo góc nhìn
        duration: 1000 // Thời gian chuyển đổi mượt mà
      });

      // Kiểm tra khoảng cách với các bước chỉ dẫn
      steps.forEach((step) => {
        const stepLocation = step.maneuver.location;
        const distance = getDistance(current, stepLocation);
         window.ReactNativeWebView.postMessage("Thông điệp từ WebView");
        if (distance < 50) { // Nếu gần bước chỉ dẫn
          //document.ReactNativeWebView.postMessage("Thông điệp từ WebView");
        }
      });

      index++;
    } else {
      clearInterval(interval); // Dừng mô phỏng khi hoàn tất lộ trình
    }
  }, 2000); // Di chuyển mỗi 2 giây
});

      </script>
    </body>
    </html>
  `;
  console.log("render")
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        onMessage={(event) => {
          Alert.alert('Thông báo từ WebView:', event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MapboxNavigation;
