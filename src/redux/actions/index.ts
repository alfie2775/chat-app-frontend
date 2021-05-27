import {
  Chats,
  GroupChat,
  PersonalChat,
  ReduxAction,
  User,
} from "../../utils/types";

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
export const removeGroupMember = (
  id: string,
  groupId: string
): ReduxAction => ({
  type: "REMOVE_GROUP_MEMBER",
  payload: { id, groupId },
});

export const removeGroupAdmin = (id: string, groupId: string): ReduxAction => ({
  type: "REMOVE_GROUP_ADMIN",
  payload: { id, groupId },
});

export const refreshCurrentChat = (chats: Chats): ReduxAction => ({
  type: "REFRESH_CURRENT_CHAT",
  payload: chats,
});

export const addGroupMember = (id: string, member: User): ReduxAction => ({
  type: "ADD_GROUP_MEMBER",
  payload: {
    id,
    member,
  },
});
