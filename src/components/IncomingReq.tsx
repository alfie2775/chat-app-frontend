import { Container, Row, Col, Button } from "react-bootstrap";
import { addFriend, deleteIncomingReq } from "../redux/actions";
import { useSelector, useDispatch } from "../redux/hooks";
import { acceptRequest } from "../utils/api";
import { User } from "../utils/types";

const IncomingReq = () => {
  const state: User[] = useSelector((state) => state.incomingReq);
  const dispatch = useDispatch();

  const handleDeleteReq = (ir: User) => {};

  const handleAcceptReq = async (ir: User) => {
    const res = await acceptRequest(ir._id);
    console.log(res);
    if (res.success) {
      dispatch(deleteIncomingReq(ir));
      dispatch(addFriend(ir));
    }
  };

  return (
    <Container>
      {state.map((ir, idx) => (
        <Row key={idx}>
          <Col sm={3}>IMG</Col>
          <Col sm={5}>{ir.username}</Col>
          <Col sm={4}>
            <Button variant="danger" onClick={() => handleDeleteReq(ir)}>
              <i className="fas fa-delete"></i>
            </Button>
            <Button onClick={() => handleAcceptReq(ir)}>
              <i className="fas fa-arrow"></i>
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default IncomingReq;
