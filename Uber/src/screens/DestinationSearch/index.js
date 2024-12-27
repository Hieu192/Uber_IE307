import React, { useState, useEffect,useRef } from "react";
import { View, TextInput, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../utils/axios";
import styles from "./styles.js";
import PlaceRow from "./PlaceRow";
import * as Location from "expo-location";
import { use } from "react";
import { useSelector } from "react-redux";
import saveSearchHistory, { getSearchHistory } from "../../utils/SaveHistorySearch.js";
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
  console.log("originPlace:::", originPlace);
  const [currentOriginPlace, setCurrentOriginPlace] = useState({});
  const [destinationPlace, setDestinationPlace] = useState({});
  const [originInput, setOriginInput] = useState(null);
  const [destinationInput, setDestinationInput] = useState(null);
  console.log("destinationInput", destinationInput);
  console.log("originInput", originInput);
  const [isStartSuggestion, setIsStartSuggestion] = useState(false);
  const [isEndSuggestion, setIsEndSuggestion] = useState(false);
  const [suggestOriginLocation, setSuggestOriginLocation] = useState([]);
  console.log("suggestOriginLocation:::", suggestOriginLocation);
  const [suggestDestinationLocation, setSuggestDestinationLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [visible, setVisible] = useState("");
  const [selectButton, setSelectButton] = useState(1);
  const [searchHistory, setSearchHistory] = useState();
  console.log("searchHistory:::", searchHistory);
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.user_id);
  console.log("userId::", userId);
  const checkNavigation = () => {
    if (isEndSuggestion) {
      console.log("destinationPlace vip:::", destinationPlace);
      if(destinationPlace.place_id) {
        saveSearchHistory(userId, destinationPlace);
        if (originPlace.place_id && isStartSuggestion) {
          saveSearchHistory(userId, originPlace);
        }
      } else {
        return 1;
      }
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
    if (type === "origin" && isStartSuggestion) {
      setVisible("origin");
      // setOriginPlace("");
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
      setOriginPlace({ place_id: place.place_id, value: place.description || place.name });
      setIsStartSuggestion(true);
      console.log("originPlace:::", originPlace);
      inputDestinationRef.current.focus()
    } else {
      setDestinationPlace({ place_id: place.place_id, value: place.description || place.name });
      setIsEndSuggestion(true);
      inputOriginRef.current.focus()
    }
  };
  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
    const { data } = await axiosInstance.get("/geocode", {
      params: {
        latlng: location.coords.latitude + "," + location.coords.longitude,
      },
    });
    setOriginPlace({ value: data.results[0].formatted_address, place_id: data.results[0].place_id });
    setCurrentOriginPlace({ value: data.results[0].formatted_address, place_id: data.results[0].place_id });
  };

  const fetchSearchHistory = async () => {
    try {
      const dataHistory = await getSearchHistory(userId); // Chờ kết quả từ hàm bất đồng bộ
      setSearchHistory(dataHistory); // Cập nhật state với kết quả
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử tìm kiếm: ", error);
    }
  };
  useEffect(() => {
    fetchSearchHistory();
    const fetchLocation = async () => {
      await getCurrentLocation();
    };
    fetchLocation();
  }, []);


  useEffect(() => {
    checkNavigation();
  }, [isEndSuggestion]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
        ref={inputOriginRef}
          style={visible === "origin" ? styles.inputFocus : styles.input}
          placeholder={visible === "origin" ? "Chọn điểm đón" : "Vị trí hiện tại"}
          onChangeText={(value) => {
            setOriginInput(value);
            setOriginPlace({ value });
            handleChangeInput(value, "origin");
          }}
          onFocus={() => {
            handleFocus("origin");
          }}
          onBlur={async () => {
            if (!originPlace.place_id) { // Kiểm tra nếu chưa chọn đề nghị
              setOriginPlace(currentOriginPlace);
            }
          }}
          value={originPlace.value}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
        {(originPlace.value && visible === "origin") && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setOriginPlace({ value: "" });
              setOriginInput(null );
              setSuggestOriginLocation([]);
            }}
          >
            <Text style={styles.clearText}> × </Text>
          </TouchableOpacity>
        )} 
        <TextInput
          ref={inputDestinationRef}
          style={visible === "destination" ? styles.inputFocus : styles.input}
          placeholder="Chọn điểm đến"
          onChangeText={(value) => {
            setDestinationInput( value );
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
        {((!destinationInput && visible === "destination") || (!originInput && visible === "origin")) && 
        (<View>
          <View style={styles.rowButton}>
          <TouchableOpacity onPress={() => handleSelectButton(1)}>
              <Text style={[
                styles.button,
                selectButton === 1 && styles.selectButton]}>Gần đây</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectButton(2)}>
              <Text style={[
                styles.button,
                selectButton === 2 && styles.selectButton]}>Đề xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectButton(3)}>
            <Text style={[
                styles.button,
                selectButton === 3 && styles.selectButton]}>Đã lưu</Text>
          </TouchableOpacity>
        </View>
        
          <View style={styles.listView1}>
            {searchHistory?.map((item , index) => (
              <PlaceRow
                key={index}
                data={item}
                handleSelectSuggestion={handleSelectSuggestion}
                type={visible === "destination" ? "destination" : "origin"}
              />
            ))}
          </View>
        </View>
        )}
        {(visible === "origin" && originInput ) && (
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
        {(visible === "destination" && destinationInput) && (
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
