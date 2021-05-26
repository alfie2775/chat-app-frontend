import { User, ReduxAction } from "../../utils/types";

export const user: (state: User | {}, action: ReduxAction) => User | {} = (
  state = {},
  action
) => {
  switch (action.type) {
    case "SET_USER": {
      let newUser = { ...action.payload };
      delete newUser.admin;
      delete newUser.hash;
      delete newUser.salt;
      delete newUser.lastSeen;
      return newUser;
    }
    case "REMOVE_USER": {
      return {};
    }
    default:
      return state;
  }
};
