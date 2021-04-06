import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Navigation from "./src/navigation";

// for aws Amplify
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

Amplify.configure(config);

function App() {
  // useEffect only receives synchronous function thus define an asyn
  // and call this async in a sync call
  useEffect(() => {
    const fetchUser = async () => {
      // get authenticated use from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // get the user from the backend with the user id from Auth
      if (userInfo) {
        name = userInfo.username;
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          console.log(`User ${name} is already registered in database`);
        } else {
          console.log(`Register a new user ${name}`);

          const newUser = {
            id: userInfo.attributes.sub,
            name,
            imageUri: getRandomImage(),
            status: "Hey, I am using WhatsApp",
          };

          await API.graphql(graphqlOperation(createUser, { input: newUser }));
        }
      }
    };
    fetchUser();
  }, []); // empty deps to run this only when app is mounted

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}

export default withAuthenticator(App);
