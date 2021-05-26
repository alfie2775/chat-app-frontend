import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { setChats, setFriends, setIncomingReqs } from "../redux/actions";
import { useDispatch, useSelector } from "../redux/hooks";
import { getAllUserData } from "../utils/api";
import Sidebar from "./Sidebar";
import MainChat from "./MainChat";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

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
      dispatch({ type: "SET_SOCKET", payload: user._id });
      setLoading(false);
    }
    helper();

    return () => {
      didCancel = true;
    };
  }, [dispatch, user._id]);

  if (loading) return <></>;

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row>
        <Col sm={12} md={5} style={{ height: "100vh" }}>
          <Sidebar />
        </Col>
        <Col style={{ height: "100vh" }}>
          <MainChat />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
