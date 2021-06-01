import { Col, Row } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { Chats, PersonalChat, User } from "../utils/types";
import Image from "./Image";

const PersonalChatInfo = ({ chat }: { chat: PersonalChat }) => {
  const user: User = useSelector((state) => state.user);
  const chats: Chats = useSelector((state) => state.chats);
  return (
    <>
      <Row>
        <Col sm={12}>
          <p className="title">{chat.to.firstname + " " + chat.to.lastname}</p>
        </Col>
        <Col sm={12}>
          <p>
            @<span>{chat.to.username}</span>
          </p>
        </Col>
        <Row>
          <Col sm={12}>
            <p>Mutual Groups</p>
            {chats
              .filter(
                (Chat) =>
                  "name" in Chat &&
                  Chat.members.find((member) => member._id === user._id) &&
                  Chat.members.find((member) => member._id === chat.to._id)
              )
              .map((group) => (
                <Row key={group._id}>
                  <Col sm={3}>
                    <Image src={chat.to.img} alt={chat.to.username} />
                  </Col>
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
