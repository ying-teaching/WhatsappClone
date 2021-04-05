import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import moment from "moment";

import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

const ChatListItem = ({ chatRoom }) => {
  const navigation = useNavigation();

  const user = chatRoom.users[1];

  const onClick = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage.content}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage &&
            moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
