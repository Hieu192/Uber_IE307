import React from "react";
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import CustomDrawer from "./CustomDrawer";
import TripHistoryScreen from "../screens/TripsHistory";
import TripStack from "./TripStack";

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
)

const RootNavigator = (props) => {
  return (
    <>
      <Drawer.Navigator drawerContent={
        (props) => (
          <CustomDrawer {...props} />)
      }>
        <Drawer.Screen name="Home" component={HomeStack} options={{
          headerShown: false,
        }}/>

        <Drawer.Screen name="Các chuyến đi của tôi " component={TripStack} options={{
          headerShown: false,
        }}/>

        <Drawer.Screen name="Trợ giúp">
          {() => <DummyScreen name={"Trợ giúp "} />}
        </Drawer.Screen>

        <Drawer.Screen name="Ví của tôi ">
          {() => <DummyScreen name={"Ví của tôi "} />}
        </Drawer.Screen>

        <Drawer.Screen name="Cài đặt">
          {() => <DummyScreen name={"Cài đặt "} />}
        </Drawer.Screen>

      </Drawer.Navigator>
    </>
  );
};

export default RootNavigator;
