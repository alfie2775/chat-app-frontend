import { Container } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";
import About from "./About";

const MainChat = () => {
  const currentChat = useSelector((state) => state.currentChat);

  if ("kite" in currentChat) return <About />;

  return (
    <Container fluid>
      <ChatInfo />
      <Messages />
    </Container>
  );
};

export default MainChat;
