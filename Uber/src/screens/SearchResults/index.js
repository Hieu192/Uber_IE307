import React, { use, useEffect, useState } from "react";
import { View, Dimensions, Alert } from "react-native";
import RouteMap from "../../components/RouteMap";
import UberTypes from "../../components/UberTypes";
// import { createOrder } from '../../graphql/mutations';
import theme from "../../theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import axiosInstance from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import {updateRide} from  "../../redux/slices/app"
const SearchResults = (props) => {
  const typeState = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { originPlace, destinationPlace } = route.params;
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  console.log("dia diem di",originPlace)
  console.log("dia diem den",destinationPlace)
  const onSubmit = async (originPlace, destinationPlace) => {
    const [type] = typeState;
    if (!type) {
      return;
    }
    try {
      const date = new Date();
      navigation.navigate("FindDriver", { originPlace, destinationPlace });
    } catch (e) {
      console.error(e);
    }
  };
  const fetchLocation = async () => {
    console.log("fetchLocation");
    try {
      const originReponse = await axiosInstance.get("/Place/Detail", {
        params: {
          place_id: originPlace.place_id,
        },
      });
      const destinationResponse = await axiosInstance.get("/Place/Detail", {
        params: {
          place_id: destinationPlace.place_id,
        },
      });
      const { lat: latOrigin, lng: lngOrigin } =
        originReponse.data.result.geometry.location;
      const { lat: latDestination, lng: lngDestination } =
        destinationResponse.data.result.geometry.location;
      setOriginLocation({ latitude: latOrigin, longitude: lngOrigin });
      setDestinationLocation({latitude: latDestination,longitude: lngDestination,});
      //console.log("Gia tri phan hoi la ::", latOrigin, lngOrigin);
      const directionResponse = await axiosInstance.get("/Direction", {
        params: {
          origin: latOrigin + "," + lngOrigin,
          destination: latDestination + "," + lngDestination,
          alternatives: false,
          vehicle: "bike", //car, bike, taxi, truck, hd
        },
      });
     // console.log("Gia tri phan hoi la directionResponse::", directionResponse.data.routes[0].legs[0].distance.text);
      setDistance(directionResponse.data.routes[0].legs[0].distance.text);
      // setDirection(
      //   decodePolyline(
      //     directionResponse.data.routes[0].overview_polyline.points
      //   )
      // );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>
      <View style={{ height: 400, backgroundColor: "white" }}>
        <UberTypes
          typeState={typeState}
          onSubmit={() => {
            onSubmit(originPlace, destinationPlace);
          }}
          distance={distance}
        />
      </View>
    </View>
  );
};

export default SearchResults;
