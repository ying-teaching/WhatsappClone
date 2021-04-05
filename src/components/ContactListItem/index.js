import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onClick = () => {
    console.warn("Chat with a user");
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
