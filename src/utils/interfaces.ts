export interface User {
  firstname: string;
  lastname: string;
  username: string;
  _id: string;
  chat: any;
  friends: string[];
  groups: string[];
  incomingReq: string[];
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
