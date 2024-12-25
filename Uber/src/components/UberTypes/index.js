import React, { useEffect } from "react";
import { View, Text, Pressable, Button, ScrollView } from "react-native";
import styles from "./styles.js";
import UberTypeRow from "../UberTypeRow";
import CreateRide from "../../components/CreateRide";
import typesData from "../../assets/data/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setApplyIdSelect, setIdSelect } from "../../redux/slices/methodPayload.js";
import createRide from "../CreateRide";
const UberTypes = ({ typeState, onSubmit, distance }) => {
  const  dispatch = useDispatch()
  const [selectedType, setSelectedType] = typeState;
  const navigation = useNavigation()
  const route = useRoute();
  //console.log("route:::", route.params);
  const {ride}=useSelector((state)=>state.app)
  const selectedMethod = useSelector((state) => state.method.method);
  const applyDiscountCode = useSelector((state) => state.method.applyDiscountCode);
  const discountCode = useSelector((state) => state.method.discountCode);
  const idSelect = useSelector((state) => state.method.idSelect);
  const applyIdSelect = useSelector((state) => state.method.applyIdSelect);
  // console.log("selectedMethod:::", selectedMethod)
  // console.log("idSelect:::", idSelect)
  // console.log("applyIdSelect:::", applyIdSelect)
  // console.log("selectedType:::", selectedType)
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Hủy hành động quay lại mặc định nếu cần
      // e.preventDefault();
      
      // Reset giá trị Redux state về mặc định
      // dispatch(setApplyIdSelect(null)); 
      // dispatch(setIdSelect(null));
      dispatch(resetState());
    });
    return unsubscribe; // Cleanup khi component unmount
  }, [navigation, dispatch]);
  return (
    <View style={{flex: 1}}>
      <View style={{ height: 280, borderWidth: 1, borderColor: '#ddd'}}>
      <ScrollView>
        {typesData.map((type) => (
          <UberTypeRow
            distance={distance}
            type={type}
            key={type.id}
            isSelected={type.id === selectedType}
            onPress={() => {
              setSelectedType(type.id)
              dispatch(setIdSelect(type.id))
            }}
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
            navigation.navigate("Discount")
          }}  
          style={{flex: 1,padding: 10, backgroundColor: 'white', alignItems: "center", justifyContent: "center", borderTopRightRadius: 30,}}>
          <Text style={{ color: 'black' }}>{(idSelect == applyIdSelect) ? applyDiscountCode : "Ưu đãi"}</Text>
        </Pressable>
      </View>

        <Pressable
          onPress={async () => {
            try {
            const success = await createRide(dispatch, ride);
              if (success) {
                onSubmit(); // Chuyển trang nếu thành công
              } else {
                console.error("Create ride failed");
                // Có thể thông báo lỗi cho người dùng nếu cần
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }}}
          style={{
            backgroundColor: "green",
            padding: 10,
            margin: 10,
            borderRadius: 24,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
            Đặt Xe
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UberTypes;
