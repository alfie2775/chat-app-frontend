import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Main = () => {
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
