import { FC } from "react";
import { useSelector } from "../redux/hooks";
import { GroupMessage, PersonalMessage, User } from "../utils/types";
import Linkify from "react-linkify";

const Message: FC<{ msg: PersonalMessage | GroupMessage }> = ({ msg }) => {
  const user: User = useSelector((state) => state.user);

  const userMessage =
    "from" in msg ? msg.from === user._id : msg.user._id === user._id;

  return (
    <div
      style={{
        marginLeft: userMessage ? "auto" : "20px",
        maxWidth: "70%",
      }}
    >
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a
            target="_blank"
            style={{ textAlign: "end" }}
            rel="noreferrer"
            href={decoratedHref}
            key={key}
          >
            {decoratedText}
          </a>
        )}
      >
        {msg.text}
      </Linkify>
      <p style={{ textAlign: "end" }}>{msg.createdAt}</p>
    </div>
  );
};

export default Message;
