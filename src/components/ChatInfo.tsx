import { Col, Modal, ModalBody, ModalTitle, Row } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { GroupChat, PersonalChat } from "../utils/types";
import PersonalChatInfo from "./PersonalChatInfo";
import GroupChatInfo from "./GroupChatInfo";
import { useState } from "react";

const ChatInfo = () => {
  const chat: PersonalChat | GroupChat = useSelector(
    (state) => state.currentChat
  );
  const [show, setShow] = useState(false);
  return (
    <Row>
      <Col sm={3}>IMG</Col>
      <Col onClick={() => setShow(!show)}>
        {"to" in chat ? chat.to.firstname + " " + chat.to.lastname : chat.name}
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <ModalTitle>IMG</ModalTitle>
        <ModalBody>
          {"to" in chat ? (
            <PersonalChatInfo chat={chat} />
          ) : (
            <GroupChatInfo chat={chat} />
          )}
        </ModalBody>
      </Modal>
    </Row>
  );
};

export default ChatInfo;
