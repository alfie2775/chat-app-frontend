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
      <Col sm={2}>
        <Image
          src={"to" in chat ? chat.to.img : chat.img}
          alt={"to" in chat ? chat.to.username : chat.name}
        />
      </Col>
      <Col sm={10} onClick={handleClick}>
        <div className="d-flex flex-column">
          <p>
            {"to" in chat
              ? chat.to.firstname + " " + chat.to.lastname
              : chat.name}
          </p>
          <p>
            {chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].text.substr(0, 50)
              : "This chat is empty"}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
