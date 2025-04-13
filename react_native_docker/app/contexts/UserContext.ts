import { createContext } from "react";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>> | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: null,
});
