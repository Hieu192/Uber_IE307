import React from "react";
import { View, Text, Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'

import styles from './styles.js';

const HomeSearch = (props) => {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('DestinationSearch')
  }

  return (
    <View>
      {/*  Input Box */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputText}>Bạn muốn đến đâu?</Text>
        <View style={styles.timeContainer}>
          <AntDesign name={'search1'} size={16} color={'#535353'} />
          <Text>Tìm kiếm</Text>
        </View>
      </Pressable>

      {/* Previous destination */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name={'clockcircle'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>lịch sử</Text>
      </View>

      {/* Home destination */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name={'home'} size={20} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>địa chỉ nhà</Text>
      </View>
    </View>
  );
};

export default HomeSearch;
