import { User, ReduxAction } from "../../utils/types";

export const incomingReq: (
  state: User[] | [],
  action: ReduxAction
) => User[] | [] = (state = [], action) => {
  switch (action.type) {
    case "SET_INCOMING_REQS":
      return action.payload;
    case "ADD_INCOMIN_REQ":
      return [...state, action.payload];
    case "REMOVE_INCOMING_REQ":
      return state.filter(
        (incomingreq) => incomingreq._id !== action.payload._id
      );
    default:
      return state;
  }
};
