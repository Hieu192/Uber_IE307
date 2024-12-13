import React from "react";
import { View, Text, Pressable, Button, ScrollView } from "react-native";
import styles from './styles.js';
import UberTypeRow from '../UberTypeRow';

import typesData from '../../assets/data/types';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const UberTypes = ({ typeState, onSubmit, distance }) => {
  const [selectedType, setSelectedType] = typeState;
  const navigation = useNavigation()
  const route = useRoute();
  console.log("route:::", route.params)
  const selectedMethod = useSelector((state) => state.method.method);
  return (
    <View style={{flex: 1}}>
      <View style={{ height: 280, borderWidth: 1, borderColor: '#ddd'}}>
      <ScrollView>
        {typesData.map((type) => (
          <UberTypeRow
            distance={distance}
            type={type}
            key={type.id}
            isSelected={type.type === selectedType}
            onPress={() => setSelectedType(type.type)}
          />
        ))}
      </ScrollView>
    </View>

      <View style={{marginTop: 5, borderTopLeftRadius: 30,borderTopRightRadius: 30, borderWidth: 1,borderColor: '#ddd',
        backgroundColor: 'white'}}>
      <View 
        style={{ 
          flexDirection: "row", 
          alignItems: "center",
        }}>
        <Pressable 
          onPress={() => {
            navigation.navigate("checkoutType", )
          }}
          style={{ flex: 1,padding: 10, backgroundColor: 'white', alignItems: "center", justifyContent: "center", borderTopLeftRadius: 30,}}>
          <Text style={{ color: 'black' }}>{selectedMethod || "Tiền mặt"}</Text>
        </Pressable>
        <Pressable onPress={() => {
            navigation.navigate("checkoutType")
          }}  
          style={{flex: 1,padding: 10, backgroundColor: 'white', alignItems: "center", justifyContent: "center", borderTopRightRadius: 30,}}>
          <Text style={{ color: 'black' }}>Ưu đãi</Text>
        </Pressable>
      </View>

      <Pressable onPress={onSubmit} style={{
        backgroundColor: 'green',
        padding: 10,
        margin: 10,
        borderRadius: 24,
        alignItems: 'center',
      }}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
          Đặt Xe 
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

export default UberTypes;
