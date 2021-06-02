import { useEffect, useRef, useState } from "react";
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
  const [clicked, setClicked] = useState(false);
  const ref = useRef(false);
  const onClick = async (e: any) => {
    if (typeof onButtonClick === "function") {
      setLoading(true);
      await onButtonClick();
      if (ref.current) return;
      setButtonText(afterText || text);
      setLoading(false);
      setClicked(true);
    }
  };

  useEffect(
    () => () => {
      ref.current = true;
    },
    []
  );

  return (
    <Button
      style={{ marginTop: "50%", transform: "translateY(-50%)" }}
      disabled={clicked}
      {...buttonProps}
      onClick={onClick}
    >
      {loading ? <CustomButtonLoading /> : buttonText}
    </Button>
  );
};

export default CustomButton;
