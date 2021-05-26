import { combineReducers } from "redux";
import { user } from "./user";
import { chats } from "./chats";
import { friends } from "./friends";
import { incomingReq } from "./incomingReq";
import { socket } from "./socket";
import { currentChat } from "./currentChat";

export default combineReducers({
  user,
  chats,
  friends,
  incomingReq,
  socket,
  currentChat,
});
