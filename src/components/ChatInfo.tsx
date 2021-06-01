import { Col, Modal, ModalBody, ModalTitle, Row } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { GroupChat, PersonalChat } from "../utils/types";
import PersonalChatInfo from "./PersonalChatInfo";
import GroupChatInfo from "./GroupChatInfo";
import { useState } from "react";
import Image from "./Image";

const ChatInfo = () => {
  const chat: PersonalChat | GroupChat = useSelector(
    (state) => state.currentChat
  );
  const [show, setShow] = useState(false);
  return (
    <Row className="chat-info">
      <Col sm={3}>
        <Image
          src={"to" in chat ? chat.to.img : chat.img}
          alt={"to" in chat ? chat.to.username : chat.name}
        />
      </Col>
      <Col className="clickable" sm={9} onClick={() => setShow(!show)}>
        {"to" in chat ? chat.to.firstname + " " + chat.to.lastname : chat.name}
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <ModalTitle>
          <Image
            className="chat-info-modal"
            src={"to" in chat ? chat.to.img : chat.img}
            alt={"to" in chat ? chat.to.username : chat.name}
          />
        </ModalTitle>
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
