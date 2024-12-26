import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axios";
// import Polyline from "@mapbox/polyline";
import MapView, { Polyline as RNPolyline, Marker } from "react-native-maps";
// import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
// import { updateLoading, updateRide } from "../../redux/slices/app";
// import { GeoPoint } from "firebase/firestore";
import { getBoundsOfDistance } from "geolib";

const MapFindDriver = ({ origin }) => {
  const mapRef = useRef(null);
  const [originLocation, setOriginLocation] = useState(null);
  const drivers = useSelector((state) => state.app.drivers);
  const [isReady, setIsReady] = useState(false);
  const fetchLocation = async () => {
    try {
      const originReponse = await axiosInstance.get("/Place/Detail", {
        params: {
          place_id: origin.place_id,
        },
      });
       // console.log("Gia tri phan hoi la",originReponse);
      const { lat: latOrigin, lng: lngOrigin } =
        originReponse.data.result.geometry.location;
      setOriginLocation({ latitude: latOrigin, longitude: lngOrigin });
      // console.log("Gia tri phan hoi la", latOrigin, lngOrigin);
      setIsReady(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  useEffect(() => {
    if (originLocation) {
        const { latitude, longitude } = originLocation;
        // Tính toán tọa độ góc trong bán kính 1km
        const bounds = getBoundsOfDistance(
        { latitude, longitude }, // Tọa độ trung tâm
        2000 // Bán kính (1km = 1000 mét)
        );
      mapRef.current.fitToCoordinates(
        [
            { latitude: bounds[0].latitude, longitude: bounds[0].longitude }, // Góc Tây Nam
            { latitude: bounds[1].latitude, longitude: bounds[1].longitude }, // Góc Đông Bắc
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Khoảng cách từ các điểm đến viền màn hình
          animated: true, // Có hiệu ứng khi thay đổi khung nhìn
        }
      );
    }
  }, [originLocation, mapRef.current]);
  useEffect(() => {
    // Reset trạng thái khi quay lại màn hình
    return () => {
      setOriginLocation(null);
      setIsReady(false);
    };
  }, []);
  if (!isReady || !originLocation) {
    return null; // Hoặc hiển thị màn hình chờ nếu cần
  }
  return (
    originLocation && (
      <MapView
        key={JSON.stringify(drivers)}
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
        initialRegion={{
          latitude: originLocation ? originLocation.latitude : 0,
          longitude: originLocation ? originLocation.longitude : 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {originLocation && (
          <Marker
            coordinate={originLocation}
            title={"Vị trí của bạn ở đây "}
            pinColor={"red"}
          />
        )}
        {drivers.length > 0  ? (
          drivers.map((driver, index) => {
            {/* console.log(`Rendering Marker for driver ${index}:`, typeof driver.location.latitude, driver); */}
            if (driver.location.latitude && driver.location.longitude) {
              {/* console.log("Driver Location:", driver.location); */}
              return (
                <Marker
                  key={driver.id}
                  coordinate={{
                    "latitude": driver.location.latitude,
                    "longitude": driver.location.longitude,
                  }}
                  title={driver?.fullName}
                  image={driver.vehicle === "car" ? require("../../assets/images/taxi-2.png") : require("../../assets/images/bike-1.png")}
                />
              );
            }
            return null;
          })
        ) : (
          <></> // Hiển thị một trạng thái chờ khác nếu cần
        )}
      </MapView>
    )
  );
};

export default MapFindDriver;
