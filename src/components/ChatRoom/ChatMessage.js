import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import styles from "./styles";

import Colors from "../../constants/Colors";

export default function ChatMessage({ message, myId }) {
  const isMyMessage = message.user.id === myId;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage ? Colors.LIGHT_GREEN : Colors.WHITE,
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
}
