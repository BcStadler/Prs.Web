import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { IRequest } from "./IRequest";
import { requestAPI } from "./RequestAPI";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";
import toast from "react-hot-toast";

interface RequestRowProps {
  request: IRequest;
  onRemove: (request: IRequest) => void;
}

function RequestRow({ request, onRemove }: RequestRowProps) {
  return (
    <tr>
      <th scope="row">{request.id}</th>
      <td>{request.tableNumber}</td>
      <td className="text-body-secondary small text-wrap">
        {request.notes || "—"}
      </td>
      <td>
        <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
          {request.status}
        </span>
      </td>
      <td>${request.total.toFixed(2)}</td>
      <td>
        {request.staff?.firstName || request.staffName || "-"}{" "}
        {request.staff?.lastName || ""}
      </td>
      <td>
        {request.requestedAt
          ? new Date(request.requestedAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })
          : "—"}
      </td>
      <td>
        <Dropdown className="d-inline">
          <Dropdown.Toggle
            className="btn btn-link text-body border-0 p-1 staff-card-menu-toggle dropdown-toggle-no-caret"
            aria-label={`Open actions for request ${request.id}`}
            style={{ textDecoration: "none" }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="pe-none"
            >
              <circle cx="8" cy="3" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="13" r="1.5" />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/requests/detail/${request.id}`}>
              View
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/requests/edit/${request.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("Are you sure you want to delete this request?")) {
                  if (request.id) {
                    try {
                      await requestAPI.delete(request.id);
                      onRemove(request);
                      toast.success("Successfully deleted.");
                    } catch (error) {
                      const message =
                        error instanceof Error
                          ? error.message
                          : "An unexpected error occurred.";
                      toast.error(message, { duration: 6000 });
                    }
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default RequestRow;
