import React, { useState } from "react";
import { View, Dimensions, Alert } from "react-native";
import RouteMap from "../../components/RouteMap";
import UberTypes from "../../components/UberTypes";
// import { createOrder } from '../../graphql/mutations';
import theme from "../../theme";
import { useRoute, useNavigation } from "@react-navigation/native";

const SearchResults = (props) => {
  const typeState = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { originPlace, destinationPlace } = route.params;
  console.log("dia diem di",originPlace)
  console.log("dia diem den",destinationPlace)
  const onSubmit = async (originPlace, destinationPlace) => {
    const [type] = typeState;
    if (!type) {
      return;
    }

    // submit to server
    try {
      const date = new Date();
      navigation.navigate("OrderPage", { originPlace, destinationPlace });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>
      <View style={{ height: 400, backgroundColor: "white" }}>
        <UberTypes
          typeState={typeState}
          onSubmit={() => {
            onSubmit(originPlace, destinationPlace);
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
