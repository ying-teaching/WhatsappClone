import React from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";

import styles from "./styles";

const ChatListItem = ({ chatRoom }) => {
  const user = chatRoom.users[1];
  return (
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
  );
};

export default ChatListItem;
