import { IRequest, IRequests } from "./IRequest";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requestss`;

export const requestsAPI = {
  list(status?: string): Promise<IRequest[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  post(request: IRequest): Promise<IRequest> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(request: IRequest): Promise<IRequest> {
    return fetch(`${url}/${request.id}`, {
      method: "PUT",
      body: JSON.stringify(request),
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
    return fetch(`${url}/${id}/Review`, { method: "PUT" }).then(checkStatus);
  },
  approved(id: number) {
    return fetch(`${url}/${id}/Approved`, { method: "PUT" }).then(checkStatus);
  },
  reject(id: number, rejectionReason: string) {
    return fetch(`${url}/${id}/Reject`, {
      method: "PUT",
      body: JSON.stringify(rejectionReason),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus);
  },
  startPreparing(id: number) {
    return fetch(`${url}/${id}/StartPreparing`, { method: "PUT" }).then(
      checkStatus,
    );
  },
  markReady(id: number) {
    return fetch(`${url}/${id}/MarkReady`, { method: "PUT" }).then(checkStatus);
  },
  markServed(id: number) {
    return fetch(`${url}/${id}/MarkServed`, { method: "PUT" }).then(
      checkStatus,
    );
  },
  cancel(id: number, cancellationReason: string) {
    return fetch(`${url}/${id}/Cancel`, {
      method: "PUT",
      body: JSON.stringify(cancellationReason),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus);
  },
};

export const requestAPI = requestsAPI;
export type { IRequests };
