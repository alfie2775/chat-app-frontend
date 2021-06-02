import { GroupChat, PersonalChat, ReduxAction } from "../../utils/types";

const defaultCurrentChat = {
  kite: "0.0.1",
};

export const currentChat = (
  state: PersonalChat | GroupChat | any = defaultCurrentChat,
  action: ReduxAction
): PersonalChat | GroupChat | null => {
  switch (action.type) {
    case "SET_CURRENT_CHAT":
      return action.payload;
    case "REFRESH_CURRENT_CHAT":
      let newState = action.payload.filter((chat: any) => {
        if ("to" in chat && "to" in state) {
          if (chat.to._id === state.to._id) return true;
        } else if ("name" in chat && "name" in state) {
          if (chat._id === state._id) return true;
        }
        return false;
      });
      if (newState.length < 1) return state;
      return newState[0];
    default:
      return state;
  }
};
