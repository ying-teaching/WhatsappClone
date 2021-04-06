import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import ChatListItem from "./ChatListItem";
import NewMessageButton from "../NewMessageButton";

import { API, graphqlOperation, Auth } from "aws-amplify";

import getUser from "./getUser";
import styles from "./styles";

export default function ChatRoomsScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  async function fetchChatRooms() {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUser, {
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
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}
