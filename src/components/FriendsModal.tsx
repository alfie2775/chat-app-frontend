import { Tab, Tabs } from "react-bootstrap";
import Friends from "./Friends";
import AddNewFriends from "./AddNewFriends";

const FriendsModal = () => {
  return (
    <Tabs defaultActiveKey="friends-list">
      <Tab eventKey="friends-list" title="Friends">
        <Friends />
      </Tab>
      <Tab eventKey="add-friends" title="Add new Friends">
        <AddNewFriends />
      </Tab>
    </Tabs>
  );
};

export default FriendsModal;
