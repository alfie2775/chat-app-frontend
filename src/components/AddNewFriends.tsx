import { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  Col,
} from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { User } from "../utils/types";
import { searchUsers } from "../utils/api";
import Member from "./Member";
import { Socket } from "socket.io-client";

const AddNewFriends = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const friends: User[] = useSelector((state) => state.friends);
  const socket: Socket = useSelector((state) => state.socket);
  const handleSearch = async (e: any) => {
    e.preventDefault();
    let value = ref.current ? ref.current.value : "";
    if (value === "" || value === "@") {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    const res = await searchUsers(value);
    if (res.success) setSearchResults(res.users);
    else setSearchResults([]);
    setLoading(false);
  };
  const handleSendRequest = (to: string) => {
    socket.emit("send friend request", { to });
  };
  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <FormGroup className="row">
          <Col sm={10}>
            <FormControl
              type="text"
              ref={ref}
              placeholder="To search by username, use @ at beginning"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </Col>
          <Col sm={2}>
            <Button type="submit">Search</Button>
          </Col>
        </FormGroup>
      </Form>
      {loading ? (
        <></>
      ) : (
        searchResults
          .filter((user) => !friends.find((friend) => friend._id === user._id))
          .map((user: User) => {
            return (
              <Member
                key={user._id}
                member={user}
                buttonText="Send"
                afterText="Request Sent"
                buttonProps={{ className: "btn-sm" }}
                onButtonClick={() => handleSendRequest(user._id)}
              />
            );
          })
      )}
    </Container>
  );
};

export default AddNewFriends;
