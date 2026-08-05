import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { IRequest } from "./IRequest";
import { requestsAPI } from "./RequestAPI";
import {
  formatCurrency,
  getTextBackgroundByStatus,
} from "../utility/formatUtilities";
import toast from "react-hot-toast";

interface RequestRowProps {
  request: IRequest;
  onRemove: (request: IRequest) => void;
}

function formatDeliveryMode(deliveryMode: string) {
  if (!deliveryMode) return "";
  switch (deliveryMode.trim().toUpperCase()) {
    case "PICKUP":
      return "Pickup";
    case "DELIVERY":
      return "Delivery";
    case "SIGNATURE_DELIVERY":
      return "Signature Delivery";
    default:
      return deliveryMode;
  }
}

function RequestRow({ request, onRemove }: RequestRowProps) {
  return (
    <tr>
      <th scope="row">{request.id}</th>
      <td>
        <div>{request.description}</div>
        <div className="text-body-secondary small">{request.justification}</div>
      </td>
      <td>
        <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
          {request.status
            ? `${request.status.trim().charAt(0).toUpperCase()}${request.status
                .trim()
                .slice(1)
                .toLowerCase()}`
            : ""}
        </span>
      </td>
      <td>{formatCurrency(request.total)}</td>
      <td>
        <div>
          {request.user?.firstName} {request.user?.lastName}
        </div>
        <div className="text-body-secondary small">
          {formatDeliveryMode(request.deliveryMode)}
        </div>
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
              Review
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
                      await requestsAPI.delete(request.id);
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