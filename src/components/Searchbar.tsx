import { Dispatch, FC, SetStateAction, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";

interface Props {
  isChatsVisible: boolean;
  setIsChatsVisible: Dispatch<SetStateAction<boolean>>;
}

const Searchbar: FC<Props> = () => {
  const [value, setValue] = useState("");

  const handleSearch = (e: any): void => {
    setValue(e.target.value);
  };

  return (
    <Row>
      <Col sm={12}>
        <FormControl type="text" value={value} onChange={handleSearch} />
      </Col>
    </Row>
  );
};

export default Searchbar;
