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

const randomIcon = "https://placeimg.com/32/32/any";

// useEffect only receives synchronous function thus define an async
// and call this async in a sync call
async function fetchUser() {
  // get authenticated use from Auth
  const userInfo = await Auth.currentAuthenticatedUser({
    bypassCache: true,
  });

  // get the user from the backend with the user id from Auth
  if (userInfo) {
    const name = userInfo.username;
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
        imageUri: randomIcon,
        status: "Hey, I am using WhatsApp",
      };

      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    }
  } else {
    console.warn("Failed to get Auth user.");
  }
}

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true, // to supress analytic warning message
  },
});

function App() {
  useEffect(() => {
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
