import axios, { AxiosResponse } from "axios";
import { getEndpoint, getToken, qs } from "./base";

const endpoint = getEndpoint("/notes");

axios.interceptors.request.use(
  function (config) {
    // Add headers every request
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const createNoteAPI = <T, R>(data: T) =>
  axios.post<T, AxiosResponse<R>>(endpoint, data).then((res) => res.data);

export interface GetNotesFilter {
  userId: string;
  favorite: boolean;
}
export const getNotesAPI = <R>(filter: Partial<GetNotesFilter>) =>
  axios.get<R>(`${endpoint}?${qs(filter)}`).then((res) => res.data);

export const getNoteByIdAPI = <R>(id: string) =>
  axios.get<R>(endpoint + "/" + id).then((res) => res.data);

export const deleteNoteAPI = <R>(id: string) =>
  axios.delete<R>(endpoint + "/" + id).then((res) => res.data);

export const editNoteAPI = <T, R>(id: string, data: T) =>
  axios
    .patch<T, AxiosResponse<R>>(endpoint + "/" + id, data)
    .then((res) => res.data);
