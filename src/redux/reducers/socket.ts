import io, { Socket } from "socket.io-client";
import { ReduxAction } from "../../utils/types";
import { api } from "../../utils/api";

export const socket: (state: Socket | "", action: ReduxAction) => any = (
  state = "",
  action
) => {
  switch (action.type) {
    case "SET_SOCKET": {
      if (state !== "") state.close();
      let socket = io(api, {
        query: {
          id: action.payload,
        },
      });
      return socket;
    }
    default:
      return state;
  }
};
