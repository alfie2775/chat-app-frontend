import { Container } from "react-bootstrap";
import UserInfo from "./UserInfo";
import Searchbar from "./Searchbar";
import { useState } from "react";
import Chats from "./Chats";
import SearchResults from "./SearchResults";

const Sidebar = () => {
  const [isChatsVisible, setIsChatsVisible] = useState(true);
  return (
    <Container>
      <UserInfo />
      <Searchbar {...{ isChatsVisible, setIsChatsVisible }} />
      {isChatsVisible ? <Chats chats={[]} /> : <SearchResults />}
    </Container>
  );
};

export default Sidebar;
