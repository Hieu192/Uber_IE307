import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axios";
import Polyline from "@mapbox/polyline";
import MapView, { Polyline as RNPolyline, Marker } from "react-native-maps";
import theme from "../../theme"
// Giải mã polyline
const decodePolyline = (encodedPolyline) => {
  const decodedPoints = Polyline.decode(encodedPolyline);
  const points = decodedPoints.map((point, index) => ({
    latitude: point[0],
    longitude: point[1],
  }));
  return points;
};
const RouteMap = ({ origin, destination }) => {
  const mapRef = useRef(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [direction, setDirection] = useState([]);
  // console.log(origin)
  // console.log(destination)
  const fetchLocation = async () => {
    console.log("đã được gọi fetch");
    try {
      const originReponse = await axiosInstance.get("/Place/Detail", {
        params: {
          place_id: origin.place_id,
        },
      });
      const destinationResponse = await axiosInstance.get("/Place/Detail", {
        params: {
          place_id: destination.place_id,
        },
      });
      //  console.log("Gia tri phan hoi la",originReponse);
      const { lat: latOrigin, lng: lngOrigin } =
        originReponse.data.result.geometry.location;
      const { lat: latDestination, lng: lngDestination } =
        destinationResponse.data.result.geometry.location;
      setOriginLocation({ latitude: latOrigin, longitude: lngOrigin });
      setDestinationLocation({
        latitude: latDestination,
        longitude: lngDestination,
      });
      console.log("Gia tri phan hoi la", latOrigin, lngOrigin);
      const directionResponse = await axiosInstance.get("/Direction", {
        params: {
          origin: latOrigin + "," + lngOrigin,
          destination: latDestination + "," + lngDestination,
          alternatives: false,
          vehicle: "bike", //car, bike, taxi, truck, hd
        },
      });
      setDirection(
        decodePolyline(
          directionResponse.data.routes[0].overview_polyline.points
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  useEffect(() => {
    if (originLocation && destinationLocation && direction.length > 0) {
      mapRef.current.fitToCoordinates(
        [originLocation, ...direction, destinationLocation],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Khoảng cách từ các điểm đến viền màn hình
          animated: true, // Có hiệu ứng khi thay đổi khung nhìn
        }
      );
    }
  }, [originLocation, destinationLocation, direction]);
  // console.log("đường đi là", direction);
  // console.log("toa do origin", originLocation);
  // console.log("toa do destination", destinationLocation);
  return (
    originLocation && (
      <MapView
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
        {direction.length > 0 && (
          <RNPolyline
            coordinates={direction}
            strokeColor={theme.colors.primary}
            strokeWidth={6}
          />
        )}
        {originLocation && (
          <Marker coordinate={originLocation} title={"Origin"} pinColor={'red'}/>
        )}
        {destinationLocation && (
          <Marker coordinate={destinationLocation} title={"Destination"}pinColor={'yellow'} />
        )}
      </MapView>
    )
  );
};

export default RouteMap;
