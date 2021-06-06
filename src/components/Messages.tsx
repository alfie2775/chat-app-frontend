import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormGroup, Row } from "react-bootstrap";
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
    if (ref.current?.lastChild)
      (ref.current?.lastChild as any).scrollIntoView({
        block: "nearest",
        inline: "start",
      });
  }, [chat]);

  return (
    <>
      <Row className="messages" ref={ref}>
        {chat.messages.map((msg: PersonalMessage | GroupMessage) => {
          let currDate = new Date(msg.createdAt).toLocaleDateString();
          if (prevDate !== currDate) {
            prevDate = currDate;
            return (
              <div key={msg._id}>
                <div className="date-message">
                  <span>{currDate}</span>
                </div>
                <div style={{ height: "fit-content" }}>
                  <Message msg={msg} />
                </div>
              </div>
            );
          }
          return (
            <div key={msg._id}>
              <Message msg={msg} />
            </div>
          );
        })}
      </Row>
      <Row className="send-message-form" style={{ margin: 0, padding: 0 }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl
              aria-label="send-message"
              type="text"
              required
              value={text}
              placeholder="Type your message"
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
