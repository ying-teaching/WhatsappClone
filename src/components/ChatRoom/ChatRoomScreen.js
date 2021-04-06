import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground } from "react-native";

import { useRoute } from "@react-navigation/native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { messagesByChatRoom } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";

import ChatMessage from "./ChatMessage";
import BG from "../../../assets/BG.png";
import InputBox from "../InputBox";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);
  const route = useRoute();

  async function fetchMessages() {
    const messagesData = await API.graphql(
      graphqlOperation(messagesByChatRoom, {
        chatRoomID: route.params.id,
        sortDirection: "DESC",
      })
    );

    const items = messagesData.data.messagesByChatRoom.items;
    console.log(`fetched ${items.length} messages.`);
    setMessages(items);
  }

  async function getMyId() {
    const userInfo = await Auth.currentAuthenticatedUser();
    setMyId(userInfo.attributes.sub);
  }

  function subscribeMessages() {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          console.log("Message is in another room!");
          return;
        }

        fetchMessages();
      },
    });

    // for clean up
    return () => subscription.unsubscribe();
  }

  useEffect(() => {
    fetchMessages();
    getMyId();
    return subscribeMessages();
  }, []);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
}
