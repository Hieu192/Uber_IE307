import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from './styles.js';

import Ionicons from "react-native-vector-icons/Ionicons";

const UberTypeRow = (props) => {
  const {type, onPress, isSelected, distance} = props;
  //console.log("distance:::", distance)
  const distanceNumber = parseInt(distance, 10);
  const calculatePrice = () => {
    const basePrice = 1.5;
    const pricePerKm = 1.5;
    const price = basePrice + (type.pricePerKm * distanceNumber);
    return price;
  }
  const price = calculatePrice();
  const price1 = Math.round(price / 1000) * 1000
  const price2 = price1.toLocaleString("de-DE")
  const getImage = () => {
    if (type.type === 'Xe máy tiết kiệm') {
      return require('../../assets/images/bike-1.png');
    }
    if (type.type === 'Xe máy Bình Dương') {
      return require('../../assets/images/bike-1.png');
    }
    if (type.type === 'Ô tô tiết kiệm') {
      return require('../../assets/images/taxi-2.png');
    }
    if (type.type === 'Ô tô Bình Dương') {
      return require('../../assets/images/taxi-2.png');
    }
    // if (type.type === 'taxi-3') {
    //   return require('../../assets/images/bike-1.png');
    // }
    return require('../../assets/images/taxi-1.png');
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {
        backgroundColor: isSelected ? '#efefef' : 'white',
      }]}
    >

      {/*  Image */}
      <Image
        style={styles.image}
        source={getImage()}
      />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type}{' '}
          <Ionicons name={'person'} size={16} />
          {type.seat}
        </Text>
        <Text style={styles.time}>
          Cách điểm đón khoảng 2 phút
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {/* <Ionicons name={'pricetag'} size={18} color={'#42d742'} /> */}
        <Text style={styles.price}>{price2}đ</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRow;
