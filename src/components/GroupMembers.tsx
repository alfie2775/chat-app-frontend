import { Row } from "react-bootstrap";
import { GroupChat, User } from "../utils/types";
import Member from "./Member";

const GroupMembers = ({
  isAdmin,
  user,
  chat,
  handleAdminRemove,
  handleMemberRemove,
}: {
  isAdmin: User | undefined;
  user: User;
  chat: GroupChat;
  handleAdminRemove: (id: string) => void;
  handleMemberRemove: (id: string) => void;
  [key: string]: any;
}) => {
  return (
    <>
      <Row>Admins</Row>
      {chat.admins.map((admin) => {
        if (admin._id === user._id)
          return <Member key={user._id} member={user} />;
        else if (isAdmin)
          return (
            <Member
              key={admin._id}
              member={admin}
              onButtonClick={() => handleAdminRemove(admin._id)}
              buttonProps={{ className: "btn-sm", variant: "danger" }}
              buttonText="Remove"
              afterText="Removed"
            />
          );
        else return <Member key={admin._id} member={admin} />;
      })}
      <Row>Members</Row>
      {chat.members
        .filter((member) =>
          chat.admins.find((admin) => admin._id !== member._id)
        )
        .map((member) => {
          if (isAdmin)
            return (
              <Member
                key={member._id}
                member={member}
                buttonText="Remove"
                afterText="Removed"
                buttonProps={{ variant: "danger", className: "btn-sm" }}
                onButtonClick={() => handleMemberRemove(member._id)}
              />
            );
          else return <Member key={member._id} member={member} />;
        })}
    </>
  );
};

export default GroupMembers;
