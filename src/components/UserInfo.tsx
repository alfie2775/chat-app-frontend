import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { User } from "../utils/types";

const Options = () => {
  return (
    <Col className="d-flex  justify-content-around align-items-center">
      <i className="fas fa-user-friends"></i>
      <Dropdown>
        <Dropdown.Toggle>
          <i className="fas fa-ellipsis-v"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            {" "}
            <i className="fas fa-sign-out-alt mr-1"></i>Sign out
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            <i className="fas fa-cog mr-1"></i>Settings
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

function UserInfo() {
  const user: User = useSelector((state) => state.user);
  return (
    <Container>
      <Row>
        <Col sm={3}>img</Col>
        <Col sm={5}>{user.username}</Col>
        <Options />
      </Row>
    </Container>
  );
}

export default UserInfo;
