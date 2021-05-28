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
        marginRight: userMessage ? "20px" : "0",
        maxWidth: "70%",
        textAlign: userMessage ? "end" : "start",
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
      <p
        style={{ textAlign: userMessage ? "end" : "start", fontSize: "small" }}
      >
        {new Date(msg.createdAt)
          .toLocaleTimeString()
          .replace(/:[0-9][0-9] /, " ")}
      </p>
    </div>
  );
};

export default Message;
