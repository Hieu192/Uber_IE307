import React, { use, useEffect } from "react";
import { View, Dimensions } from "react-native";

import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';
import { useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/methodPayload";
import { clearDrivers } from "../../redux/slices/app";

const HomeScreen = (props) => {
  const dispatch  = useDispatch();
  useEffect(() => {
    // Reset Redux state khi màn hình Home được render
    dispatch(resetState());
    dispatch(clearDrivers());
  }, [dispatch]);
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <HomeMap />
      </View>
      {/*  Bottom Comp*/}
      <HomeSearch />
    </View>
  );
};

export default HomeScreen;
