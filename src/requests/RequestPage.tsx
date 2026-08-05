import { useEffect, useState, ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IRequest } from "./IRequest";
import { requestsAPI } from "./RequestAPI";
import RequestRow from "./RequestRow";
import toast from "react-hot-toast";

function RequestsPage() {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get("status") ?? "";

  const addButtonStyle = {
    backgroundColor: "#0d6efd",
    borderColor: "#0d6efd",
    color: "#fff",
  } as const;

  function removeRequest(request: IRequest) {
    setRequests((previousRequests) =>
      previousRequests.filter((o) => o.id !== request.id),
    );
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value;
    if (status) {
      setSearchParams({ status });
      return;
    }

    setSearchParams({});
  }

  useEffect(() => {
    let active = true;

    const loadRequests = async (status?: string) => {
      setLoading(true);
      try {
        const data = await requestsAPI.list(status);
        if (active) {
          setRequests(data);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        toast.error(message, { duration: 6000 });
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadRequests(selectedStatus || undefined);

    return () => {
      active = false;
    };
  }, [selectedStatus]);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Requests</h2>
        <Link
          to="/requests/create"
          className="btn d-inline-flex align-items-center gap-2"
          style={addButtonStyle}
        >
          <span
            style={{ fontSize: "1.50rem", lineHeight: 1, fontWeight: 700 }}
            aria-hidden="true"
          >
            +
          </span>
          <span>Create a request</span>
        </Link>
      </div>
      <section className="list bg-body-tertiary p-4 rounded-4">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-select w-auto mb-3"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="NEW">New</option>
          <option value="REVIEW">Review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        {loading && <p>Loading...</p>}
        <table className="table table-hover w-100 rounded-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Requested By</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
                onRemove={removeRequest}
              />
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default RequestsPage;