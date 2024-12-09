import React, { useState, useEffect,useRef } from "react";
import { View, TextInput, SafeAreaView, Text, TouchableOpacity } from "react-native";
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
  const inputOriginRef = useRef(null);
  const inputDestinationRef = useRef(null);
  const [originPlace, setOriginPlace] = useState({});
  const [destinationPlace, setDestinationPlace] = useState({});
  const [isStartSuggestion, setIsStartSuggestion] = useState(false);
  const [isEndSuggestion, setIsEndSuggestion] = useState(false);
  const [suggestOriginLocation, setSuggestOriginLocation] = useState([]);
  const [suggestDestinationLocation, setSuggestDestinationLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [visible, setVisible] = useState("");
  const [selectButton, setSelectButton] = useState(1);
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
  const handleSelectButton = (id) => {
    setSelectButton(id);
  }
  const handleFocus = (type) => {
    console.log("type", type);
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
      if(!value)return 1;
      const { data } = await axiosInstance.get("/Place/AutoComplete", {
        params: {
          input: value,
          location: currentLocation.latitude + "," + currentLocation.longitude,
        },
      });
      if (type === "origin") {
        setIsStartSuggestion(false);
        setSuggestOriginLocation(data.predictions||[]);
      } else {
        setIsEndSuggestion(false); 
        setSuggestDestinationLocation(data.predictions||[]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectSuggestion = (place, type) => {
    if (type === "origin") {
      setOriginPlace({ place_id: place.place_id, value: place.description });
      setIsStartSuggestion(true);
      inputDestinationRef.current.focus()
    } else {
      setDestinationPlace(place);
      setIsEndSuggestion(true);
      inputOriginRef.current.focus()
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
        ref={inputOriginRef}
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
          ref={inputDestinationRef}
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
        {(visible !== "origin" && visible !== "destination") && (<View style={styles.rowButton}>
          <TouchableOpacity onPress={() => handleSelectButton(1)}>
              <Text style={[
                styles.button,
                selectButton === 1 && styles.selectButton]}>Gần đây</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectButton(2)}>
              <Text style={[
                styles.button,
                selectButton === 2 && styles.selectButton]}>Đề nghị trước đó</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectButton(3)}>
            <Text style={[
                styles.button,
                selectButton === 3 && styles.selectButton]}>Đã lưu</Text>
          </TouchableOpacity>
        </View>)}
        {visible === "origin" && (
          <View style={styles.listView}>
            {suggestOriginLocation?.map((place, index) => (
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
            {suggestDestinationLocation?.map((place, index) => (
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
