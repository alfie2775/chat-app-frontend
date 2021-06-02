import { User } from "../utils/types";
import { Row, Col } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { useState } from "react";
import Image from "./Image";

const Member: React.FC<{
  member: User;
  showUsername?: boolean;
  afterText?: string;
  onButtonClick?: any;
  buttonText?: string;
  buttonProps?: any;
}> = ({
  member,
  showUsername = true,
  afterText = "",
  buttonText = "",
  onButtonClick = undefined,
  buttonProps = {},
}) => {
  const [show, setShow] = useState(false);
  return (
    <Row onMouseMove={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Col sm={3}>
        <Image src={member.img} alt={member.username} />
      </Col>
      <Col sm={7}>
        <div>{member.firstname + " " + member.lastname}</div>
        <div style={{ fontSize: "small" }}>
          {showUsername && `@${member.username}`}
        </div>
      </Col>
      {buttonText !== "" && (
        <Col sm={2} style={{ position: "relative" }}>
          <CustomButton
            text={buttonText}
            afterText={afterText}
            onButtonClick={onButtonClick}
            buttonProps={{
              ...buttonProps,
              className: buttonProps.className
                ? buttonProps.className + " " + (show ? "cb-open" : "cb-close")
                : show
                ? "cb-open"
                : "cb-close",
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default Member;
