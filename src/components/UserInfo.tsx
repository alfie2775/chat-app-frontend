import { Dispatch, useState, SetStateAction } from "react";
import {
  Row,
  Col,
  Dropdown,
  Modal,
  ModalTitle,
  ModalBody,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { addChat, resetState } from "../redux/actions";
import { useSelector, useDispatch } from "../redux/hooks";
import { createGroup, logout } from "../utils/api";
import { User } from "../utils/types";
import FriendsModal from "./FriendsModal";
import IncomingReq from "./IncomingReq";
import Image from "./Image";

const Options = ({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const toggleModal = () => setOpen(!open);
  const handleCreate = async (e: any) => {
    e.preventDefault();
    toggleModal();
    if (value !== "") {
      const group = await createGroup(value);
      if (group.success) dispatch(addChat(group.group));
    }
  };

  return (
    <Col className="d-flex  justify-content-around align-items-center">
      <span
        onClick={() => setModal(true)}
        className="fas fa-user-friends"
      ></span>
      <Dropdown>
        <Dropdown.Toggle className="dropdown-" aria-label="option-dropdown">
          <i className="fas fa-ellipsis-v"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={toggleModal}>
            <Row>
              <Col sm={2}>
                <span className="fas fa-users"></span>
              </Col>{" "}
              <Col sm={10}> New Group</Col>
            </Row>
          </Dropdown.Item>
          <Dropdown.Item>
            <Row>
              <Col sm={2}>
                <i className="fas fa-cog mr-1"></i>
              </Col>{" "}
              <Col sm={10}> Settings</Col>
            </Row>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              logout();
              dispatch(resetState());
              history.push("/");
            }}
          >
            <Row>
              <Col sm={2}>
                <i className="fas fa-sign-out-alt mr-1"></i>
              </Col>{" "}
              <Col sm={10}> Sign out</Col>
            </Row>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={open} onHide={toggleModal}>
        <ModalTitle>Create a new group</ModalTitle>
        <ModalBody>
          <Form onSubmit={handleCreate}>
            <FormGroup>
              <FormLabel>Group Name</FormLabel>
              <FormControl
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit">Create</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Col>
  );
};

function UserInfo() {
  const user: User = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const [flag, setFlag] = useState(false);
  return (
    <>
      <Row className="user-info">
        <Col
          sm={3}
          className="d-flex align-items-center justify-content-center"
        >
          <Image src={user.img} alt={user.username} />
        </Col>
        <Col className="d-flex align-items-center username justify-content-center">
          {user.username}
        </Col>
        <Options setModal={setModal} />
      </Row>
      <Modal onHide={() => setModal(!modal)} show={modal}>
        <ModalTitle className="d-flex justify-content-center pt-2">
          <Button variant="outline-light" onClick={(e: any) => setFlag(!flag)}>
            {flag ? "Friend Requests" : "Friends List"}
          </Button>
        </ModalTitle>
        <ModalBody>{flag ? <FriendsModal /> : <IncomingReq />}</ModalBody>
      </Modal>
    </>
  );
}

export default UserInfo;
