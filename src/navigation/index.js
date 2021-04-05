import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

import MainTabNavigator from "./MainTabNavigator";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

const RootStack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
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
        <RootStack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
          options={({ route }) => ({
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
          })}
        />
        <RootStack.Screen name="Contacts" component={ContactsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
