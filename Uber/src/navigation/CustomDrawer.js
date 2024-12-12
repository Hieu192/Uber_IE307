import React from "react";
import { View, Text, Pressable } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { useDispatch } from "react-redux";
import {Logout} from "../redux/slices/auth"
const CustomDrawer = (props) => {
  const dispatch=useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#cacaca',
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}/>

          <View>
            <Text style={{color: 'white', fontSize: 24}}>Phuc Cao</Text>
            <Text style={{color: 'lightgrey'}}>5.00 *</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#919191',
          borderTopWidth: 1,
          borderTopColor: '#919191',
          paddingVertical: 5,
          marginVertical: 10,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#dddddd', paddingVertical: 5,}}>Tin nhắn</Text>
          </Pressable>
        </View>

        { /* Do more */}
        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd', paddingVertical: 5,}}>Làm được nhiều hơn với tài khoản của bạn</Text>
        </Pressable>

        {/* Make money */}
        <Pressable onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: 'white', paddingVertical: 5}}>Lái xe kiếm tiền </Text>
        </Pressable>


      </View>

      <DrawerItemList {...props} />

      {/* Make money */}
      <Pressable onPress={() => {dispatch(Logout()) }}>
        <Text style={{padding: 5, paddingLeft: 20}}>Đăng xuất</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
