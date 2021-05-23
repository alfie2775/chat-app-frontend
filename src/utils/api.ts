import axios from "axios";
const api = "http://localhost:5000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authentication: "Bearer " + localStorage.getItem("kite-chat-token")!,
});

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
