import { IRequest } from "./IRequest";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requests`;

export const requestsAPI = {
  list(status?: string): Promise<IRequest[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  post(requests: IRequest): Promise<IRequest> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(requests: IRequest): Promise<IRequest> {
    return fetch(`${url}/${requests.id}`, {
      method: "PUT",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
  find(id: number): Promise<IRequest> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  review(id: number) {
    return fetch(`${url}/${id}/review`, { method: "PUT" }).then(checkStatus);
  },
  approve(id: number) {
    return fetch(`${url}/${id}/approve`, { method: "PUT" }).then(checkStatus);
  },
  reject(id: number, rejectionReason: string) {
    return fetch(`${url}/${id}/reject`, {
      method: "PUT",
      body: rejectionReason,
      headers: { "Content-Type": "text/plain" },
    }).then(checkStatus);
  },
};