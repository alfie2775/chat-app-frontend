import { combineReducers } from "redux";
import { user } from "./user";
import { chats } from "./chats";
import { friends } from "./friends";
import { incomingReq } from "./incomingReq";

export default combineReducers({ user, chats, friends, incomingReq });
