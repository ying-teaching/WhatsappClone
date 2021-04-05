import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ChatListItem from "../components/ChatListItem";
import users from "../../data/Users";
import ContactListItem from "../components/ContactListItem";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
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
