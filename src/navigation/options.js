import React from "react";
import { View } from "react-native";

import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

export const screenOptions = {
  // shared options for all screens
  headerStyle: {
    backgroundColor: Colors.TINT_GREEN,
    shadowOpacity: 0, // remove shadow on iOS
    elevation: 0, // remove shadow on Android
  },
  headerTintColor: Colors.WHITE,
  headerTitleAlign: "left",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export const homeOptions = {
  title: "WhatsApp",
  headerRight: () => (
    <View
      style={{
        flexDirection: "row",
        width: 60,
        justifyContent: "space-between",
        marginRight: 10,
      }}
    >
      <Octicons name="search" size={22} color={"white"} />
      <MaterialCommunityIcons name="dots-vertical" size={22} color={"white"} />
    </View>
  ),
};

export function chatRoomOptions({ route }) {
  return {
    title: route.params.name,
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          width: 100,
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <FontAwesome5 name="video" size={22} color={"white"} />
        <MaterialIcons name="call" size={22} color={"white"} />
        <MaterialCommunityIcons
          name="dots-vertical"
          size={22}
          color={"white"}
        />
      </View>
    ),
  };
}
