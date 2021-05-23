import React from "react";
interface Props {
  firstname: string;
  lastname: string;
  username: string;
  messages: any[];
}
const Chat: React.FC<{ chat: Props }> = ({ chat }) => {
  return (
    <div>
      <p>{chat.firstname}</p>
    </div>
  );
};

export default Chat;
