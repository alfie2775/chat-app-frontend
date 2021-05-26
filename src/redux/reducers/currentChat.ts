import { GroupChat, PersonalChat, ReduxAction } from "../../utils/types";

export const currentChat = (
  state: PersonalChat | GroupChat | null = null,
  action: ReduxAction
): PersonalChat | GroupChat | null => {
  switch (action.type) {
    case "SET_CURRENT_CHAT":
      console.log(state?.messages, action.payload.messages);
      return action.payload;
    default:
      return state;
  }
};
