import axios, { AxiosResponse } from "axios";
import { getEndpoint, getToken } from "./base";

const endpoint = getEndpoint("/notes");

axios.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const createNoteAPI = <T, R>(data: T) =>
  axios.post<T, AxiosResponse<R>>(endpoint, data).then((res) => res.data);

export const getNotesAPI = <R>() =>
  axios.get<R>(endpoint).then((res) => res.data);

export const getNoteByIdAPI = <R>(id: string) =>
  axios.get<R>(endpoint + "/" + id).then((res) => res.data);

export const editNoteAPI = <T, R>(id: string, data: T) =>
  axios
    .patch<T, AxiosResponse<R>>(endpoint + "/" + id, data)
    .then((res) => res.data);
