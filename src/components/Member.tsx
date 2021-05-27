import { User } from "../utils/types";
import { Row, Col } from "react-bootstrap";
import CustomButton from "./CustomButton";

const Member: React.FC<{
  member: User;
  afterText?: string;
  onButtonClick?: any;
  buttonText?: string;
  buttonProps?: any;
}> = ({
  member,
  afterText = "",
  buttonText = "",
  onButtonClick = undefined,
  buttonProps = {},
}) => {
  return (
    <Row>
      <Col sm={3}>IMG</Col>
      <Col sm={7}>{member.firstname + " " + member.lastname} </Col>
      {buttonText !== "" && (
        <Col sm={2}>
          <CustomButton
            text={buttonText}
            afterText={afterText}
            onButtonClick={onButtonClick}
            buttonProps={buttonProps}
          />
        </Col>
      )}
    </Row>
  );
};

export default Member;
