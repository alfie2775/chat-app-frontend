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
      className="message"
      style={{
        marginLeft: userMessage ? "auto" : "10px",
        marginRight: userMessage ? "10px" : "0",
        maxWidth: "70%",
        wordWrap: "break-word",
        textAlign: userMessage ? "end" : "start",
        [`borderBottom${userMessage ? "Right" : "Left"}Radius`]: "1px",
      }}
    >
      {"user" in msg && (
        <p style={{ fontWeight: "bold", color: "white", marginBottom: "5px" }}>
          {msg.user.username}
        </p>
      )}

      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a
            target="_blank"
            style={{
              color: "lightgrey",
              textAlign: "end",
            }}
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
      <div
        style={{ textAlign: userMessage ? "end" : "start", fontSize: "small" }}
      >
        {new Date(msg.createdAt)
          .toLocaleTimeString()
          .replace(/:[0-9][0-9] /, " ")}
      </div>
    </div>
  );
};

export default Message;
