import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import ChatRoomsItem from "./ChatRoomsItem";
import NewMessageButton from "../NewMessageButton";

import { API, graphqlOperation, Auth } from "aws-amplify";

import getChatRooms from "./getChatRooms";
import styles from "./styles";

export default function ChatRoomsScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  async function fetchChatRooms() {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getChatRooms, {
          id: userInfo.attributes.sub,
        })
      );

      setChatRooms(userData.data.getUser.chatRoomUser.items);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomsItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}
