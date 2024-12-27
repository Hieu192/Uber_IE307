import React from "react";
import { View, Text ,TouchableOpacity} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styles from './styles'

const PlaceRow = ({ data,handleSelectSuggestion,type }) => {
  console.log("data",data)
  return (
    <TouchableOpacity onPress={()=>{
      handleSelectSuggestion(data,type)
    }}>
    <View>
      <View style={styles.row}>
          <View style={styles.iconContainer}>
            {data.description === 'Home'
              ? <Entypo name='home' siz={20} color={'white'} />
              : <Entypo name='location-pin' siz={20} color={'white'} />
            }
          </View>
          <Text style={styles.locationText}>{data.description || data.vicinity || data.name}</Text>
        </View>
      <View style={styles.lineSuggest}></View>
    </View>
      
    </TouchableOpacity>
  );
};

export default PlaceRow;
