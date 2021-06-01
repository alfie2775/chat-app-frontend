import { Chats, User } from "../utils/types";
import { useDispatch, useSelector } from "../redux/hooks";
import Member from "./Member";
import { addMemberToGroup } from "../utils/api";
import { addGroupMember, refreshCurrentChat } from "../redux/actions";

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
  const chats: Chats = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  const handleClick = async (member: User) => {
    const res = await addMemberToGroup(member._id, groupId);
    if (res.success) {
      dispatch(addGroupMember(groupId, member));
      dispatch(refreshCurrentChat(chats));
    }
  };

  return (
    <>
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
