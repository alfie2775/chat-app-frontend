import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "../redux/hooks";
import { User } from "../utils/interfaces";

const Options = () => {
  return <></>;
};

function UserInfo() {
  const user: User = useSelector((state) => state.user);
  return (
    <Container>
      <Row>
        <Col sm={3}>img</Col>
        <Col sm={7}>{user.username}</Col>
        <Col sm={2}>
          <Options />
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
