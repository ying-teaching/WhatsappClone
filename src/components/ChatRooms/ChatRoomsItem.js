import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import moment from "moment";

import styles from "./styles";

import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export default function ChatRoomsItem({ chatRoom }) {
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState(null);

  async function getOtherUser() {
    const userInfo = await Auth.currentAuthenticatedUser();
    if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
      setOtherUser(chatRoom.chatRoomUsers.items[1].user);
    } else {
      setOtherUser(chatRoom.chatRoomUsers.items[0].user);
    }
  }

  useEffect(() => {
    getOtherUser();
  }, []);

  const onClick = () => {
    console.log(`Go to room ${chatRoom.id}`);
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: `With ${otherUser.name}`,
    });
  };

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ""}
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
}
