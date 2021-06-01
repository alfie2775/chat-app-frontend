import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { Chats } from "../utils/types";
import styles from "../styles/Searchbar.module.css";

interface Props {
  chats: Chats;
  setSearchedChats: Dispatch<SetStateAction<Chats>>;
}

const Searchbar: FC<Props> = ({ chats, setSearchedChats }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = (e: any): void => {
    if (ref.current) {
      if (ref.current.value !== "") {
        let search = ref.current.value;
        let newChats: any = chats.filter((chat) =>
          "to" in chat
            ? chat.to.username
                .toLocaleLowerCase()
                .startsWith(search.toLocaleLowerCase())
            : chat.name
                .toLocaleLowerCase()
                .startsWith(search.toLocaleLowerCase())
        );
        setSearchedChats(newChats);
      } else setSearchedChats(chats);
    }
  };

  return (
    <Row>
      <Col sm={12} className="d-flex justify-content-center">
        <FormControl
          className={styles.input}
          placeholder="Search for chats"
          aria-label="search-chats"
          type="text"
          ref={ref}
          onChange={handleSearch}
        />
      </Col>
    </Row>
  );
};

export default Searchbar;
