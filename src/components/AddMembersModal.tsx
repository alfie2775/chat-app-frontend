import { Col, Row } from "react-bootstrap";
import { User } from "../utils/types";
import { useDispatch, useSelector } from "../redux/hooks";
import Member from "./Member";
import { addMemberToGroup } from "../utils/api";
import { addGroupMember } from "../redux/actions";

const AddMembersModal = ({
  members,
  groupId,
}: {
  members: User[];
  groupId: string;
}) => {
  const friends: User[] = useSelector((state) => state.friends);
  const nonMemberFriends: User[] = friends.filter(
    (friend) => !members.find((member) => member._id === friend._id)
  );
  const dispatch = useDispatch();

  const handleClick = async (member: User) => {
    const res = await addMemberToGroup(member._id, groupId);
    console.log(res);
    if (res.success) {
      dispatch(addGroupMember(groupId, member));
    }
  };

  return (
    <>
      <Row>
        <Col>Add your friends to your group</Col>
      </Row>
      {nonMemberFriends.map((friend) => (
        <Member
          key={friend._id}
          member={friend}
          buttonText="Add"
          afterText="Added"
          onButtonClick={() => handleClick(friend)}
          buttonProps={{ className: "btn-sm" }}
        />
      ))}
    </>
  );
};

export default AddMembersModal;
