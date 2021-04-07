import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import styles from "../Contacts/styles";

import { useNavigation } from "@react-navigation/native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../../graphql/mutations";
import getChatRoomUsers from "./getChatRoomUsers";

export default function ContactListItem({ user }) {
  const navigation = useNavigation();

  const onClick = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const myUserId = userInfo.attributes.sub;

      // check if there is a chatroom between the two users
      const chatRoomUsersData = await API.graphql(
        graphqlOperation(getChatRoomUsers, {
          id: myUserId,
        })
      );

      let chatRoomId;
      const chatRoomUsers = chatRoomUsersData.data.getUser.chatRoomUser.items;
      for (const chatRoomUser of chatRoomUsers) {
        const roomUsers = chatRoomUser.chatRoom.chatRoomUsers.items;
        const found = roomUsers.find(
          (roomUser) => roomUser.user.id === user.id
        );
        if (found) {
          chatRoomId = chatRoomUser.chatRoom.id;
          break;
        } else {
        }
      }

      if (chatRoomId) {
        console.log("Use exsiting chat room.");
      } else {
        chatRoomId = await newChatRoom(myUserId);
        console.log("Created a new chat room.");
      }

      navigation.navigate("ChatRoom", {
        id: chatRoomId,
        name: `With ${user.name}`,
      });
    } catch (e) {
      console.log(e);
    }
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

  async function newChatRoom(myUserId) {
    //  1. Create a new Chat Room
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {
        input: {
          lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16",
        },
      })
    );

    if (!newChatRoomData.data) {
      console.log(" Failed to create a chat room");
      return;
    }

    const newChatRoom = newChatRoomData.data.createChatRoom;

    // 2. Add `user` to the Chat Room
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: {
          userID: user.id,
          chatRoomID: newChatRoom.id,
        },
      })
    );

    //  3. Add authenticated user to the Chat Room
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: {
          userID: myUserId,
          chatRoomID: newChatRoom.id,
        },
      })
    );

    return newChatRoom.id;
  }
}
