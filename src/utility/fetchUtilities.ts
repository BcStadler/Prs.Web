export const BASE_URL = "http://localhost:5104/api";

export function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401: return "Please sign in again.";
    case 403: return "You do not have permission to view the data requested.";
    default:  return "There was an error saving or retrieving data.";
  }
}

export async function checkStatus(response: Response) {
  if (response.ok) return response;              // 2xx → pass through
  const httpError = {
    status: response.status, statusText: response.statusText,
    url: response.url, body: await response.text(),
  };
  console.log(`http error status: ${JSON.stringify(httpError, null, 1)}`);
  throw new Error(translateStatusToErrorMessage(httpError.status));
}

export function parseJSON(response: Response) {
  return response.json();
}