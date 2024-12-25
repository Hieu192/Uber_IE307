import React, { use, useEffect } from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from './styles.js';

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setDiscount, setDiscountCode, setMethod, setPrice } from "../../redux/slices/methodPayload.js";

const UberTypeRow = (props) => {
  const {type, onPress, isSelected, distance} = props;
  // console.log("type-id :::", type.id )
  const dispatch = useDispatch();
  const applyFinalPrice = useSelector((state) => state.method.applyFinalPrice);
  const applyPrice = useSelector((state) => state.method.applyPrice);
  const applyIdSelect = useSelector((state) => state.method.applyIdSelect);
  // console.log("applyIdSelect:::", applyIdSelect)
  // console.log("applyPrice:::", applyPrice)
  // console.log("applyFinalPrice:::", applyFinalPrice)
  // console.log("isSelected:::", isSelected)
  const distanceNumber = parseInt(distance, 10);
  const calculatePrice = () => {
    const basePrice = 1.5;
    const price = basePrice + (type.pricePerKm * distanceNumber);
    return price;
  }
  const price = calculatePrice();
  const price1 = Math.round(price / 1000) * 1000
  const formattedOriginalPrice = (Math.round(applyPrice / 1000) * 1000).toLocaleString("de-DE");
  const formattedDiscountedPrice = (Math.round(applyFinalPrice / 1000) * 1000).toLocaleString("de-DE");
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
  if(isSelected) {
    dispatch(setPrice(price1))
    if (type.id != applyIdSelect) {
      // dispatch(setMethod("Tiền mặt"))
      dispatch(setDiscountCode(null))
    }
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
        {
          (type.id != applyIdSelect) ? (
            <Text style={styles.price}>{price2}đ</Text>
            ) : ((applyFinalPrice < applyPrice)  ? (
              <View>
                <Text style={[styles.price, { color: 'green' }]}>{formattedDiscountedPrice}đ</Text>
                <Text style={styles.originalPrice}>{formattedOriginalPrice}đ</Text>
              </View>
            ) : (
              <Text style={styles.price}>{formattedOriginalPrice}đ</Text>
            ))
        }
      </View>
    </Pressable>
  );
};

export default UberTypeRow;
