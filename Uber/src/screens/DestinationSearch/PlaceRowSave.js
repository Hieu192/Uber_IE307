import React from "react";
import { View, Text ,TouchableOpacity} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styles from './styles'

const PlaceRowSave = ({ data,handleSelectSuggestion,type }) => {
  console.log("data",data)
  return (
    <TouchableOpacity onPress={()=>{
      // handleSelectSuggestion(data,type)
    }}>
    <View>
      <View style={styles.row}>
          <View style={styles.iconContainer}>
            {data.name === 'Home'
              ? <Entypo name='home' siz={30} color={'white'} />
              : (data.name === 'New') ? <Entypo name='circle-with-plus' siz={30} color={'white'} /> : 
              <Entypo name='briefcase' siz={30} color={'white'} />
            }
          </View>
          <Text style={styles.locationText}>{data.description || data.vicinity || data.name}</Text>
        </View>
      <View style={styles.lineSuggest}></View>
    </View>
      
    </TouchableOpacity>
  );
};

export default PlaceRowSave;
