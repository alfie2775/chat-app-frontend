import { useState } from "react";
import { Button } from "react-bootstrap";
import CustomButtonLoading from "./CustomButtonLoading";

const CustomButton = ({
  text = "",
  afterText = "",
  buttonProps = {},
  onButtonClick,
}: {
  text: string;
  afterText: string;
  buttonProps?: { [key: string]: any };
  onButtonClick?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(text);
  const onClick = async (e: any) => {
    if (typeof onButtonClick === "function") {
      setLoading(true);
      await onButtonClick();
      console.log(text, afterText);
      setButtonText(afterText || text);
      setLoading(false);
    }
  };

  return (
    <Button {...buttonProps} onClick={onClick}>
      {loading ? <CustomButtonLoading /> : buttonText}
    </Button>
  );
};

export default CustomButton;
