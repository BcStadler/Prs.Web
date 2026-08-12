import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { IRequest } from "./IRequest";
import { requestAPI } from "./RequestAPI";
import {
  formatCurrency,
  formatRequestStatus,
  getTextBackgroundByStatus,
} from "../utility/formatUtilities";
import toast from "react-hot-toast";

interface IRequestRowProps {
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

function RequestRow({ request, onRemove }: IRequestRowProps) {
  return (
    <tr>
      <th scope="row">{request.id}</th>
      <td>
        <div>{request.description}</div>
        <div className="text-body-secondary small">{request.justification}</div>
      </td>
      <td>
        <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
          {formatRequestStatus(request.status)}
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
            <i
              className="bi bi-three-dots-vertical pe-none"
              aria-hidden="true"
            />
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
