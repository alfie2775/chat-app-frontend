import React from "react";
import { Col, Row } from "react-bootstrap";
import { Dispatch } from "../redux";
import { setCurrentChat } from "../redux/actions";
import { useDispatch } from "../redux/hooks";
import { PersonalChat, GroupChat } from "../utils/types";

const Chat: React.FC<{ chat: PersonalChat | GroupChat; idx: number }> = ({
  chat,
  idx,
}) => {
  const dispatch: Dispatch = useDispatch();
  const handleClick = (e: any) => {
    dispatch(setCurrentChat({ ...chat }));
  };

  return (
    <Row>
      <Col sm={3}>
        <p>IMG</p>
      </Col>
      <Col onClick={handleClick}>
        <div className="d-flex flex-column">
          <p>
            {"to" in chat
              ? chat.to.firstname + " " + chat.to.lastname
              : chat.name}
          </p>
          <p>
            {chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].text
              : Date.now().toString()}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
