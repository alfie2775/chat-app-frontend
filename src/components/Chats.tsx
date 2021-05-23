import React from "react";
import Chat from "./Chat";
interface Props {
  firstname: string;
  lastname: string;
  username: string;
  messages: any[];
}
const Chats: React.FC<{ chats: Props[] }> = ({ chats }) => {
  return (
    <>
      {chats.map((chat, idx) => (
        <Chat chat={chat} key={idx} />
      ))}
    </>
  );
};

export default Chats;
