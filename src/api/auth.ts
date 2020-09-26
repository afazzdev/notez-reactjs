import axios from "axios";

const endpoint =
  process.env.REACT_APP_ENDPOINT + "/users" ||
  "http://localhost:5000/api/users";

export interface IUser {
  username?: string;
  password?: string;
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

    return user.data;
  }

  async signIn(data: IUser) {
    const user = await axios.post<IDataFromApi>(`${endpoint}/signin`, data);

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
