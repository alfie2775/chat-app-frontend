import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Socket } from "socket.io-client";
import { useSelector } from "../redux/hooks";
import {
  GroupChat,
  GroupMessage,
  PersonalChat,
  PersonalMessage,
} from "../utils/types";
import Message from "./Message";

const Messages = () => {
  const chat: PersonalChat | GroupChat = useSelector(
    (state) => state.currentChat
  );
  const socket: Socket = useSelector((state) => state.socket);
  const [text, setText] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if ("to" in chat) {
      socket.emit("personal message", {
        msg: text,
        to: chat.to._id,
      });
    } else {
      socket.emit("group message", {
        msg: text,
        groupId: chat._id,
      });
    }
    setText("");
  };

  useEffect(() => setText(""), [chat]);

  return (
    <>
      <Row>
        {chat.messages.map((msg: PersonalMessage | GroupMessage) => (
          <Col key={msg._id} sm={12}>
            <Message msg={msg} />
          </Col>
        ))}
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </FormGroup>
        </Form>
      </Row>
    </>
  );
};

export default Messages;
