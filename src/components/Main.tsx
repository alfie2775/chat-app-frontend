import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { setChats, setFriends, setIncomingReqs } from "../redux/actions";
import { useDispatch } from "../redux/hooks";
import { getAllUserData } from "../utils/api";
import Sidebar from "./Sidebar";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;
    async function helper() {
      const res = await getAllUserData();
      if (didCancel) return;
      if ("err" in res) return;
      const { chats, friends, incomingReq } = res;
      dispatch(setChats(chats));
      dispatch(setFriends(friends));
      dispatch(setIncomingReqs(incomingReq));
    }
    helper();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col sm={12} md={4}>
          <Sidebar />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Main;
