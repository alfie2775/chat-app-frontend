import { Container } from "react-bootstrap";
import UserInfo from "./UserInfo";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import Chats from "./Chats";
import { useSelector } from "../redux/hooks";
import { Chats as ChatsType } from "../utils/types";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const chats: ChatsType = useSelector((state) => state.chats);
  const [searchedChats, setSearchedChats] = useState(chats);

  useEffect(() => {
    setSearchedChats(chats);
  }, [chats, setSearchedChats]);

  return (
    <Container fluid className={styles.sidebar}>
      <UserInfo />
      <Searchbar chats={chats} setSearchedChats={setSearchedChats} />
      <Chats chats={searchedChats} isEmpty={chats.length < 1} />
    </Container>
  );
};

export default Sidebar;
