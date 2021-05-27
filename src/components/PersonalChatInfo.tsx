import { Col, Row } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { Chats, PersonalChat, User } from "../utils/types";

const PersonalChatInfo = ({ chat }: { chat: PersonalChat }) => {
  const user: User = useSelector((state) => state.user);
  const chats: Chats = useSelector((state) => state.chats);
  return (
    <>
      <Row>
        <Col sm={12}>
          <p>Name: {chat.to.firstname + " " + chat.to.lastname}</p>
        </Col>
        <Col sm={12}>
          <p>
            Username: <span>{chat.to.username}</span>
          </p>
        </Col>
        <Row>
          <Col sm={12}>
            <p>Mutual Groups</p>
            {chats
              .filter(
                (chat) =>
                  "name" in chat &&
                  chat.members.find((member) => member._id === user._id)
              )
              .map((group) => (
                <Row key={group._id}>
                  <Col sm={3}>IMG</Col>
                  <Col>{(group as any).name}</Col>
                </Row>
              ))}
          </Col>
          {}
        </Row>
      </Row>
    </>
  );
};

export default PersonalChatInfo;
