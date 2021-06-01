import { FC } from "react";
import { Chats, User } from "../utils/types";
import { addAdminToGroup } from "../utils/api";
import { addAdmin } from "../redux/actions";
import Member from "./Member";
import { useDispatch, useSelector } from "../redux/hooks";
import { refreshCurrentChat } from "../redux/actions";

const AddAdminsModal: FC<{ members: User[]; groupId: string; admins: User[] }> =
  ({ groupId, members, admins }) => {
    const nonAdminMembers: User[] = members.filter(
      (member) => !admins.find((admin) => admin._id === member._id)
    );
    const chats: Chats = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const handleClick = async (member: User) => {
      const res = await addAdminToGroup(member._id, groupId);
      if (res.success) {
        dispatch(addAdmin(groupId, member));
        dispatch(refreshCurrentChat(chats));
      }
    };
    return (
      <>
        {nonAdminMembers.map((member) => (
          <Member
            member={member}
            key={member._id}
            buttonText="Add"
            afterText="Added"
            onButtonClick={() => handleClick(member)}
            buttonProps={{ className: "btn-sm" }}
          />
        ))}
      </>
    );
  };
export default AddAdminsModal;
