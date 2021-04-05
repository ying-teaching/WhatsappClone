import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Fontisto } from "@expo/vector-icons";

import COLORS from "../constants/Colors";
import ChatsScreen from "../screens/ChatsScreen";

const MainTab = createMaterialTopTabNavigator();

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: COLORS.WHITE,
        style: {
          backgroundColor: COLORS.TINT_GREEN,
        },
        indicatorStyle: {
          backgroundColor: COLORS.WHITE,
          height: 4,
        },
        labelStyle: {
          fontWeight: "bold",
        },
        showIcon: true,
      }}
    >
      <MainTab.Screen
        name="Camera"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="camera" color={color} size={18} />
          ),
          tabBarLabel: () => null, // hide the tab bar label
        }}
      />
      <MainTab.Screen name="Chats" component={ChatsScreen} />
      <MainTab.Screen name="Status" component={ChatsScreen} />
      <MainTab.Screen name="Calls" component={ChatsScreen} />
    </MainTab.Navigator>
  );
}
