import axios from "axios";
import { setToken, getEndpoint } from "./base";

const endpoint = getEndpoint("/users");

export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  [key: string]: any;
}

export interface IDataFromApi {
  message?: string;
  token?: string;
  data?: Omit<IUser, "password"> & { id: number };
  error?: any;
}

export interface IErrorFromApi
  extends Pick<IDataFromApi, "error" | "message"> {}

class Auth {
  async signUp(data: IUser) {
    const user = await axios.post<IDataFromApi>(`${endpoint}/signup`, data);
    setToken(user.data.token!);
    return user.data;
  }

  async signIn(data: IUser) {
    const user = await axios.post<IDataFromApi>(`${endpoint}/signin`, data);
    setToken(user.data.token!);
    return user.data;
  }

  async getUser(token: string) {
    const user = await axios.get<IDataFromApi>(`${endpoint}/get-profile`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    return user.data;
  }
}

export default new Auth();
