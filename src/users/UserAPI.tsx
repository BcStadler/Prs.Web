import { IUser } from "./IUser";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/user`;

export const userAPI = {
  list(): Promise<IUser[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<IUser> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },

  post(user: IUser): Promise<IUser> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  put(user: IUser): Promise<IUser> {
    return fetch(`${url}/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  delete(id: number): Promise<Response> {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(checkStatus);
  },

  findByAccount(username: string, password: string): Promise<IUser> {
    return fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
};
