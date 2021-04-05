import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ChatListItem from "../components/ChatListItem";
import chatRooms from "../../data/ChatRooms";
import NewMessageButton from "../components/NewMessageButton";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
