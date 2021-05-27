import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "../redux/hooks";
import { removeMemberFromGroup } from "../utils/api";
import { GroupChat, User } from "../utils/types";
import { removeGroupMember } from "../redux/actions";
import AddMembersModal from "./AddMembersModal";
import GroupMembers from "./GroupMembers";

const GroupChatInfo = ({ chat }: { chat: GroupChat }) => {
  const user: User = useSelector((state) => state.user);
  const isAdmin = chat.admins.find((admin) => admin._id === user._id);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleLeave = () => {};
  const handleAdminRemove = () => {};
  const handleMemberRemove = async (id: string) => {
    const res = await removeMemberFromGroup(id, chat._id);
    if (res.success) {
      dispatch(removeGroupMember(id, chat._id));
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
            <Button onClick={() => setOpen(!open)}>Add Members</Button>
          )}
          <Button onClick={() => handleLeave()} variant="danger">
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
        <AddMembersModal groupId={chat._id} members={chat.members} />
      )}
    </>
  );
};

export default GroupChatInfo;
