import { Chats, ReduxAction } from "../../utils/types";

export const setChats: (chats: Chats) => ReduxAction = (chats) => ({
  type: "SET_CHATS",
  payload: chats,
});

export const addChat = (chat: any) => ({
  type: "ADD_CHAT",
  payload: chat,
});

export const setFriends = (friends: any) => ({
  type: "SET_FRIENDS",
  payload: friends,
});

export const addFriend = (friend: any) => ({
  type: "ADD_FRIEND",
  payload: friend,
});

export const addIncomingReq = (incomingReq: any) => ({
  type: "ADD_INCOMING_REQ",
  payload: incomingReq,
});

export const setIncomingReqs = (incomingReqs: any) => ({
  type: "SET_INCOMING_REQS",
  payload: incomingReqs,
});
