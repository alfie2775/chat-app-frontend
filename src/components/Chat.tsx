import React from "react";
import { Col, Row } from "react-bootstrap";
import { Dispatch } from "../redux";
import { setCurrentChat } from "../redux/actions";
import { useDispatch, useSelector } from "../redux/hooks";
import Image from "./Image";
import { PersonalChat, GroupChat } from "../utils/types";

const Chat: React.FC<{ chat: PersonalChat | GroupChat; idx: number }> = ({
  chat,
  idx,
}) => {
  const currentChat: PersonalChat | GroupChat = useSelector(
    (state) => state.currentChat
  );
  const dispatch: Dispatch = useDispatch();
  const handleClick = (e: any) => {
    if ("to" in chat && "to" in currentChat) {
      if (chat.to._id === currentChat.to._id) return;
    } else if ("name" in chat && "name" in currentChat) {
      if (chat.name === currentChat.name) return;
    }
    dispatch(setCurrentChat({ ...chat }));
  };

  const message =
    chat.messages.length < 1
      ? undefined
      : chat.messages[chat.messages.length - 1];
  if (message === undefined) {
  }

  const isSelected =
    "to" in chat && "to" in currentChat
      ? chat.to._id === currentChat.to._id
      : "name" in chat && "name" in currentChat
      ? currentChat.name === chat.name
      : false;

  return (
    <Row
      className={"chat" + (isSelected ? " selected-chat" : "")}
      style={{ cursor: "pointer" }}
    >
      <Col sm={2} className="d-flex align-items-center justify-content-center">
        <Image
          src={"to" in chat ? chat.to.img : chat.img}
          alt={"to" in chat ? chat.to.username : chat.name}
        />
      </Col>
      <Col sm={10} onClick={handleClick}>
        <div className="d-flex flex-column">
          <p className="chat-title">
            {"to" in chat
              ? chat.to.firstname +
                " " +
                chat.to.lastname +
                " " +
                chat.to.isOnline
              : chat.name}
          </p>
          <div>
            <span>{message?.text || "This chat is empty"}</span>
            {message && (
              <span className="chat-time">
                {new Date(message.updatedAt)
                  .toLocaleTimeString()
                  .replace(/:[0-9][0-9] /, " ")}
              </span>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
