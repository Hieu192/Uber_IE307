import React, { useState, useEffect } from "react";
import { View, TextInput, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../utils/axios";
import styles from "./styles.js";
import PlaceRow from "./PlaceRow";
import * as Location from "expo-location";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationSearch = (props) => {
  const [originPlace, setOriginPlace] = useState({});
  const [destinationPlace, setDestinationPlace] = useState({});
  const [isStartSuggestion, setIsStartSuggestion] = useState(false);
  const [isEndSuggestion, setIsEndSuggestion] = useState(false);
  const [suggestOriginLocation, setSuggestOriginLocation] = useState([]);
  const [suggestDestinationLocation, setSuggestDestinationLocation] = useState(
    []
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [visible, setVisible] = useState("");
  const navigation = useNavigation();
  //  console.log("Toa do hien tai la",currentLocation)
  const checkNavigation = () => {
    if (isStartSuggestion && isEndSuggestion) {
      navigation.replace("SearchResults", {
        originPlace,
        destinationPlace,
      });
    }
  };
  const handleFocus = (type) => {
    if (type === "origin" && isStartSuggestion) {
      setVisible("origin");
      setOriginPlace("");
    } else if (type === "origin") {
      setVisible("origin");
    }
    if (type === "destination" && isEndSuggestion) {
      setVisible("destination");
      setDestinationPlace("");
    } else if (type === "destination") {
      setVisible("destination");
    }
  };
  const handleChangeInput = async (value, type) => {
    try {
      const { data } = await axiosInstance.get("/Place/AutoComplete", {
        params: {
          input: value,
          location: currentLocation.latitude + "," + currentLocation.longitude,
        },
      });
      if (type === "origin") {
        setIsStartSuggestion(false);
        setSuggestOriginLocation(data.predictions);
      } else {
        setIsEndSuggestion(false);
        setSuggestDestinationLocation(data.predictions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectSuggestion = (place, type) => {
    if (type === "origin") {
      setOriginPlace({ place_id: place.place_id, value: place.description });
      setIsStartSuggestion(true);
    } else {
      setDestinationPlace(place);
      setIsEndSuggestion(true);
    }
  };
  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    checkNavigation();
  }, [isStartSuggestion, isEndSuggestion]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Chọn điểm đón"
          onChangeText={(value) => {
            setOriginPlace({ value });
            handleChangeInput(value, "origin");
          }}
          onFocus={() => {
            handleFocus("origin");
          }}
          value={originPlace.value}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Chọn điểm đến"
          onChangeText={(value) => {
            setDestinationPlace({ value });
            handleChangeInput(value, "destination");
          }}
          onFocus={() => {
            handleFocus("destination");
          }}
          value={destinationPlace.value}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
        {visible === "origin" && (
          <View style={styles.listView}>
            {suggestOriginLocation.map((place, index) => (
              <PlaceRow
                key={index}
                data={place}
                handleSelectSuggestion={handleSelectSuggestion}
                type={"origin"}
              />
            ))}
          </View>
        )}
        {visible === "destination" && (
          <View style={styles.listView}>
            {suggestDestinationLocation.map((place, index) => (
              <PlaceRow
                key={index}
                data={place}
                handleSelectSuggestion={handleSelectSuggestion}
                type={"destination"}
              />
            ))}
          </View>
        )}
        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
