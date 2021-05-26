import { ReduxAction, User } from "../../utils/types";

export const friends: (state: User[] | [], action: ReduxAction) => User[] | [] =
  (state = [], action) => {
    switch (action.type) {
      case "SET_FRIENDS":
        return action.payload;
      case "ADD_FRIEND":
        return [...state, action.payload];
      case "REMOVE_FRIEND":
        return state.filter((friend) => friend._id !== action.payload);
      default:
        return state;
    }
  };
