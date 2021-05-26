import { GroupChat, PersonalChat, ReduxAction, User } from "../../utils/types";

export const setChats: (chats: any) => ReduxAction = (chats) => ({
  type: "SET_CHATS",
  payload: chats,
});

export const addChat = (chat: PersonalChat | GroupChat) => ({
  type: "ADD_CHAT",
  payload: chat,
});

export const deleteFriends = (id: User) => ({
  type: "REMOVE_FRIEND",
  payload: id,
});

export const setFriends = (friends: User[]) => ({
  type: "SET_FRIENDS",
  payload: friends,
});

export const addFriend = (friend: User) => ({
  type: "ADD_FRIEND",
  payload: friend,
});

export const addIncomingReq = (incomingReq: User) => ({
  type: "ADD_INCOMING_REQ",
  payload: incomingReq,
});

export const deleteIncomingReq = (incomingReq: User) => ({
  type: "REMOVE_INCOMING_REQ",
  payload: incomingReq,
});

export const setIncomingReqs = (incomingReqs: User[]) => ({
  type: "SET_INCOMING_REQS",
  payload: incomingReqs,
});

export const resetState = () => ({
  type: "RESET_STATE",
});

export const setCurrentChat = (idx: PersonalChat | GroupChat) => ({
  type: "SET_CURRENT_CHAT",
  payload: idx,
});
