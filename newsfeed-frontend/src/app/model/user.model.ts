export interface User {
  username: string;
  password: string;
}

export enum LoginStatus {
  NOT_FOUND,
  WRONG_PASSWORD,
  SUCCESSFUL
}
