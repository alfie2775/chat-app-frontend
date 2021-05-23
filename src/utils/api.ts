import axios from "axios";
import { getHeaders } from "./index";
const api = "http://localhost:5000";

export const isAuth = (): boolean => {
  return localStorage.getItem("kite-chat-token") != null;
};

export const signIn = async (body: { username: string; password: string }) => {
  const res = await axios
    .post(api + "/users/login", body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err };
    });
  localStorage.setItem("kite-chat-token", res.token);
  if (res.err) return { err: res.err };
  return { user: res.user };
};
export const signUp = async (body: {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}) => {
  const res = await axios
    .post(api + "/users/signup", body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err };
    });
  localStorage.setItem("kite-chat-token", res.token);
  if (res.err) return { err: res.err };
  return { user: res.user };
};

export const logout = () => {
  localStorage.removeItem("kite-chat-token");
};

export const getAllChats = async () => {
  return await axios
    .get(api + "/users/all-chats", {
      headers: getHeaders(),
    })
    .then((res) => res.data)
    .catch((err) => ({ err }));
};

export const getFriends = async () => {
  return await axios
    .get(api + "/users/friends", {
      headers: getHeaders(),
    })
    .then((res) => res.data)
    .catch((err) => ({ err }));
};

export const getIncomingReq = async () => {
  return await axios
    .get(api + "/users/incoming-requests", {
      headers: getHeaders(),
    })
    .then((res) => res.data)
    .catch((err) => ({ err }));
};

export const getAllUserData = async () => {
  let res;
  res = await getAllChats();
  if ("err" in res) return { err: res.err };
  const chats = res;
  res = await getFriends();
  if ("err" in res) return { err: res.err };
  const friends = res;
  res = await getIncomingReq();
  if ("err" in res) return { err: res.err };
  const incomingReq = res;
  console.log(chats, friends, incomingReq);
  return {
    chats,
    friends,
    incomingReq,
  };
};
