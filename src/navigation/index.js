import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { TINT_COLOR, BG_COLOR } from "../constants/Colors";

import MainTabNavigator from "./MainTabNavigator";

const RootStack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: TINT_COLOR,
            shadowOpacity: 0, // remove shadow on iOS
            elevation: 0, // remove shadow on Android
          },
          headerTintColor: BG_COLOR,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <RootStack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{
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
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={22}
                  color={"white"}
                />
              </View>
            ),
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
