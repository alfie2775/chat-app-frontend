import { Container } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";

const MainChat = () => {
  const currentChat = useSelector((state) => state.currentChat);

  if (currentChat === null) return <></>;

  return (
    <Container>
      <ChatInfo />
      <Messages />
    </Container>
  );
};

export default MainChat;
