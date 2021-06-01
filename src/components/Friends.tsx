import { Container } from "react-bootstrap";
import { Dispatch } from "../redux";
import { useDispatch, useSelector } from "../redux/hooks";
import { User } from "../utils/types";
import { removeFriend } from "../utils/api";
import { deleteFriend } from "../redux/actions";
import Member from "./Member";

const Friends = () => {
  const friends = useSelector((state) => state.friends);
  const dispatch: Dispatch = useDispatch();
  const handleClick = async (id: string) => {
    const res = await removeFriend(id);
    if (res.success) {
      dispatch(deleteFriend(id));
    }
  };
  return (
    <Container>
      {friends.map((friend: User) => (
        <Member
          key={friend._id}
          member={friend}
          buttonText="Remove"
          afterText="Removed"
          onButtonClick={() => handleClick(friend._id)}
          buttonProps={{ className: "btn-sm", variant: "danger" }}
        />
      ))}
    </Container>
  );
};

export default Friends;
