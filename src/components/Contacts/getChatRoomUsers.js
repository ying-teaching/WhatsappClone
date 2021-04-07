const getChatRoomUsers = /* GraphQL */ `
  query GetChatRoomUsers($id: ID!) {
    getUser(id: $id) {
      chatRoomUser {
        items {
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getChatRoomUsers;
