import React from "react";
import { View, Text, Button } from "react-native";

export default function UnderConstructionScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> Under Construction</Text>
      <Button
        title="Go to Chats"
        onPress={() => {
          navigation.navigate("Chats");
        }}
      />
    </View>
  );
}
