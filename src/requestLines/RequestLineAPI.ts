import { IRequestLine } from "./IRequestLine";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/Requestlines`;

export const requestLineAPI = {
  find(id: number): Promise<IRequestLine> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(requestLine: IRequestLine): Promise<IRequestLine> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requestLine),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(requestLine: IRequestLine): Promise<IRequestLine> {
    return fetch(`${url}/${requestLine.id}`, {
      method: "PUT",
      body: JSON.stringify(requestLine),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};
