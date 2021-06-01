import { useState } from "react";
import { Button, ButtonGroup, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "../redux/hooks";
import { removeAdminFromGroup, removeMemberFromGroup } from "../utils/api";
import { Chats, GroupChat, User } from "../utils/types";
import {
  refreshCurrentChat,
  removeGroupAdmin,
  removeGroupMember,
} from "../redux/actions";
import AddMembersModal from "./AddMembersModal";
import AddAdminsModal from "./AddAdminsModal";
import GroupMembers from "./GroupMembers";

const GroupChatInfo = ({ chat }: { chat: GroupChat }) => {
  const user: User = useSelector((state) => state.user);
  const chats: Chats = useSelector((state) => state.chats);
  const isAdmin = chat.admins.find((admin) => admin._id === user._id);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleLeave = () => {};
  const handleAdminRemove = async (id: string) => {
    const res = await removeAdminFromGroup(id, chat._id);
    if (res.success) {
      dispatch(removeGroupAdmin(id, chat._id));
      dispatch(refreshCurrentChat(chats));
    }
  };
  const handleMemberRemove = async (id: string) => {
    const res = await removeMemberFromGroup(id, chat._id);
    if (res.success) {
      dispatch(removeGroupMember(id, chat._id));
      dispatch(refreshCurrentChat(chats));
    }
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <p>{chat.name}</p>
        </Col>
      </Row>
      <Row>
        <ButtonGroup>
          {isAdmin && (
            <Button style={{ width: "50%" }} onClick={() => setOpen(!open)}>
              {open ? "View Members" : "Add"}
            </Button>
          )}
          <Button
            style={{ width: "50%" }}
            onClick={() => handleLeave()}
            variant="danger"
          >
            Leave Group
          </Button>
        </ButtonGroup>
      </Row>
      {!open ? (
        <GroupMembers
          user={user}
          chat={chat}
          isAdmin={isAdmin}
          handleLeave={handleLeave}
          handleAdminRemove={handleAdminRemove}
          handleMemberRemove={handleMemberRemove}
        />
      ) : (
        <Tabs defaultActiveKey="add-members">
          <Tab eventKey="add-admin" title="Add Admins">
            <AddAdminsModal
              groupId={chat._id}
              members={chat.members}
              admins={chat.admins}
            />
          </Tab>
          <Tab eventKey="add-members" title="Add Members">
            <AddMembersModal groupId={chat._id} members={chat.members} />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default GroupChatInfo;
