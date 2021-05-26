import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "../redux/hooks";
import { signIn, signUp } from "../utils/api";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [signin, setSignin] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearState = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignin = async (e: any) => {
    e.preventDefault();
    const res = await signIn({ username, password });
    if (res.err) {
    } else {
      dispatch({ type: "SET_USER", payload: res.user });
      clearState();
      history.push("/");
    }
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const res = await signUp({ firstname, lastname, username, password });
    if (res.err) {
    } else {
      dispatch({ type: "SET_USER", payload: res.user });
      clearState();
      history.push("/");
    }
  };

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col sm={12} md={6}>
          <Form onSubmit={signin ? handleSignin : handleSignup}>
            {!signin && (
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormControl
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="firstname"
                  type="text"
                />
              </FormGroup>
            )}
            {!signin && (
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name="lastname"
                  type="text"
                />
              </FormGroup>
            )}
            <FormGroup>
              <FormLabel>Username</FormLabel>
              <FormControl
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
              ></FormControl>
            </FormGroup>
            {!signin && (
              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="c-password"
                  type="password"
                />
              </FormGroup>
            )}
            <FormGroup>
              <Button type="submit">{signin ? "Sign in" : "Sign up"}</Button>
            </FormGroup>
            <FormGroup>
              <p
                onClick={() => {
                  clearState();
                  setSignin(!signin);
                }}
              >
                {signin ? "Create a new account" : "Already have an account"}
              </p>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
