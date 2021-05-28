import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  let prevDate = "";
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

  useEffect(() => {
    setText("");
    (ref.current?.lastChild as any).scrollIntoView();
  }, [chat]);

  return (
    <>
      <Row className="messages" ref={ref}>
        {chat.messages.map((msg: PersonalMessage | GroupMessage) => {
          let currDate = new Date(msg.createdAt).toLocaleDateString();
          if (prevDate !== currDate) {
            prevDate = currDate;
            return (
              <>
                <div className="date-message">
                  <span>{currDate}</span>
                </div>
                <Col key={msg._id} sm={12}>
                  <Message msg={msg} />
                </Col>
              </>
            );
          }
          return (
            <Col key={msg._id} sm={12}>
              <Message msg={msg} />
            </Col>
          );
        })}
      </Row>
      <Row className="send-message-form">
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
