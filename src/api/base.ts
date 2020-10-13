var _token = localStorage.getItem("token");

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

export function getToken() {
  return _token;
}

export function setToken(token: string) {
  _token = token;
}
