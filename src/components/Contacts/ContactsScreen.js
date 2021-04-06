import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import { listUsers } from "../../graphql/queries";
import ContactListItem from "./ContactListItem";

export default function ChatsScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);
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
