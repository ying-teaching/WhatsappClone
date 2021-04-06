# Whatsapp Clone Tutorial

## 1 Initialization

Run `expo init WhatsappClone` and select the blank JS template.

Then in the project folder, run `yarn web/ios/android` to start a local dev server for the app and display the specicifed platform view. The dev server automatcially compiles files if there is any change.

## 2 UI

Install the required packages.

`yarn add @react-navigation/native`

`expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

It uses stack navigator. Install the package: `yarn add @react-navigation/stack`

Use top tabs: `yarn add @react-navigation/material-top-tabs react-native-tab-view@^2.16.0`. The version matters on 04/04/2021 as stated in the [doc](https://reactnavigation.org/docs/material-top-tab-navigator/).

Change the root component in `App.js` to use `SafeAreaProvider` imported from `react-native-safe-area-context`. That's the default component for Expo tab naviagation template. In this case, it sets the correct styles for the tab navigation.

The `App.js` is as the following:

```js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
```

The home screen in the root stack uses icons. [Vector Icons](https://docs.expo.io/guides/icons/) are preinstalled by Expo. Use [icons.expo.fyi](https://icons.expo.fyi/) to search icons and usage examples. The `src/navigation/index.js` is as the following:

```js
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
```

The home screen uses tab navigation. The title colors are defined in `./src/constants/Colors.js`. The `src/navigation/MainTabNavigator.js` has the following content:

```js
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
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen name="Chats" component={ChatsScreen} />
      <MainTab.Screen name="Status" component={ChatsScreen} />
      <MainTab.Screen name="Calls" component={ChatsScreen} />
    </MainTab.Navigator>
  );
}
```

Then add other screens.

## 3 AWS

Following the [Amplify document](aws-amplify aws-amplify-react-native @react-native-community/netinfo) to create an account and [create a fullstack react native project](https://docs.amplify.aws/start/getting-started/setup/q/integration/react-native).

add [authentication](https://docs.amplify.aws/start/getting-started/auth/q/integration/react-native#create-authentication-service)

## 4 GraphQL AWS
