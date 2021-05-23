import { User, ReduxAction } from "../../utils/types";

export const incomingReq: (
  state: User[] | [],
  action: ReduxAction
) => User[] | [] = (state = [], action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return action.payload;
    case "ADD_FRIEND":
      return [...state, action.payload];
    case "REMOVE_CHAT":
      return state.filter((incomingreq) => incomingreq._id !== action.payload);
    default:
      return state;
  }
};
