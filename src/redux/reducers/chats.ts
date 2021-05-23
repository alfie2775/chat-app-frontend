import { Chats, ReduxAction } from "../../utils/types";

export const chats: (state: Chats | [], action: ReduxAction) => Chats | [] = (
  state = [],
  action
) => {
  switch (action.type) {
    case "SET_CHATS":
      return action.payload;
    case "ADD_CHAT":
      return [...state, action.payload];
    case "REMOVE_CHAT":
      return state.filter((chat) => chat._id !== action.payload);
    default:
      return state;
  }
};
