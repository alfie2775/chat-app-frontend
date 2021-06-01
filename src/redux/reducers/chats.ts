import { Chats, ReduxAction, User } from "../../utils/types";

export const chats: (state: Chats | [], action: ReduxAction) => Chats | [] = (
  state = [],
  action
) => {
  switch (action.type) {
    case "SET_CHATS":
      return action.payload;
    case "ADD_CHAT":
      let newState = [action.payload, ...state];
      return newState;
    case "REMOVE_CHAT":
      return state.filter((chat) => chat._id !== action.payload);
    case "REMOVE_GROUP_MEMBER":
      return state.map((chat: any) => {
        if ("name" in chat)
          if (chat._id === action.payload.groupId)
            chat.members = chat.members.filter(
              (member: User) => member._id !== action.payload.id
            );
        return chat;
      });
    case "ADD_GROUP_MEMBER": {
      return state.map((chat: any) => {
        if ("name" in chat) {
          if (action.payload.id === chat._id)
            chat.members = [...chat.members, action.payload.member];
        }
        return chat;
      });
    }
    case "ADD_GROUP_ADMIN": {
      return state.map((chat: any) => {
        if ("name" in chat) {
          if (chat._id === action.payload.groupId) {
            chat.admins = [...chat.admins, action.payload.user];
          }
        }
        return chat;
      });
    }
    case "REMOVE_GROUP_ADMIN":
      return state.map((chat: any) => {
        if ("name" in chat)
          if (chat._id === action.payload.groupId)
            chat.admin = chat.admins.filter(
              (member: User) => member._id !== action.payload.id
            );
        return chat;
      });
    default:
      return state;
  }
};
