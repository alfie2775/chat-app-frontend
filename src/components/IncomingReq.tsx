import { useState } from "react";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import { addFriend, deleteIncomingReq } from "../redux/actions";
import { useSelector, useDispatch } from "../redux/hooks";
import { acceptRequest } from "../utils/api";
import { User } from "../utils/types";
import CustomButton from "./CustomButton";
import Image from "./Image";

const IncomingReq = () => {
  const irs: User[] = useSelector((state) => state.incomingReq);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const handleDeleteReq = (ir: User) => {};

  const handleAcceptReq = async (ir: User) => {
    const res = await acceptRequest(ir._id);
    console.log(res);
    if (res.success) {
      dispatch(deleteIncomingReq(ir));
      dispatch(addFriend(ir));
      setClicked(true);
    }
  };

  return (
    <Container>
      {irs.length < 1 ? (
        <Row>You have no friend requests</Row>
      ) : (
        irs.map((ir) => (
          <Row key={ir._id}>
            <Col sm={2}>
              <Image src={ir.img} alt={ir.username} />
            </Col>
            <Col sm={6}>
              <div>{ir.firstname + " " + ir.lastname}</div>
              <div style={{ fontSize: "small" }}>{`@${ir.username}`}</div>
            </Col>
            <Col sm={4}>
              <ButtonGroup>
                <CustomButton
                  text="Confirm"
                  afterText="Added"
                  onButtonClick={() => handleAcceptReq(ir)}
                  buttonProps={{
                    className: "btn-sm",
                    disabled: clicked,
                    style: { marginRight: "0.75rem" },
                  }}
                />
                <CustomButton
                  text="Delete"
                  afterText="Deleted"
                  onButtonClick={() => handleDeleteReq(ir)}
                  buttonProps={{
                    className: "btn-sm",
                    variant: "danger",
                    disabled: clicked,
                  }}
                />
              </ButtonGroup>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default IncomingReq;
