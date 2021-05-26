export const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("kite-chat-token")!,
});
