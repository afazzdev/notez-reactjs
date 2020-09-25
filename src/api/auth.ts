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

class Auth {
  async signUp(data: IUser): Promise<IDataFromApi> {
    const user = await axios.post(`${endpoint}/signup`, data);

    return user.data;
  }

  async signIn(data: IUser): Promise<IDataFromApi> {
    const user = await axios.post(`${endpoint}/signin`, data);

    return user.data;
  }
}

export default new Auth();
