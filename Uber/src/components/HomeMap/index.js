import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { updateLocation } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
// import cars from '../../assets/data/cars';

const HomeMap = (props) => {
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState(null);
  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    dispatch(updateLocation(location.coords));
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // const response = await API.graphql(
        //   graphqlOperation(
        //     listCars
        //   )
        // )
        // setCars(response.data.listCars.items);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCars();
  }, []);

  const getImage = (type) => {
    if (type === "UberX") {
      return require("../../assets/images/top-UberX.png");
    }
    if (type === "Comfort") {
      return require("../../assets/images/top-Comfort.png");
    }
    return require("../../assets/images/top-UberXL.png");
  };

  return (
    location && (
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain",
                transform: [
                  {
                    rotate: `${car.heading}deg`,
                  },
                ],
              }}
              source={getImage(car.type)}
            />
          </Marker>
        ))}
      </MapView>
    )
  );
};

export default HomeMap;
