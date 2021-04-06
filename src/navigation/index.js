import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { screenOptions, homeOptions, chatRoomOptions } from "./options";

import MainTabNavigator from "./MainTabNavigator";
import ChatRoomScreen from "../components/ChatRoom/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

const RootStack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={screenOptions}>
        <RootStack.Screen
          name="Home"
          component={MainTabNavigator}
          options={homeOptions}
        />
        <RootStack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
          options={chatRoomOptions}
        />
        <RootStack.Screen name="Contacts" component={ContactsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
