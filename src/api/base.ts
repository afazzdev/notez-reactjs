var _token = localStorage.getItem("token");
var _user: any = null;

interface BaseResponse<D = {}, E = any> {
  status: string;
  message?: string;
  token?: string;
  data?: D;
  error?: E;
}

export interface IResponseData<D>
  extends Pick<BaseResponse<D>, "data" | "status"> {}
export interface IResponseDataWithToken<D>
  extends Pick<BaseResponse<D>, "data" | "status" | "token"> {}
export interface IResponseError<E>
  extends Pick<BaseResponse<null, E>, "error" | "status" | "message"> {}

export const getEndpoint = (slug: string) =>
  process.env.REACT_APP_ENDPOINT + slug || "http://localhost:5000/api" + slug;

export function setToken(token: string) {
  _token = token;
}
export function getToken() {
  return _token;
}

export function setUser<T>(user: T) {
  _user = user;
}
export function getUser() {
  return _user;
}

export const qs = (params: { [key: string]: any }) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
