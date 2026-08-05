import { IUser } from "./IUser";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../utility/formatUtilities";
import { userAPI } from "./UserAPI";
import toast from "react-hot-toast";

interface IUserCardProps {
  user: IUser;
  onRemove: (user: IUser) => void;
}

function UserCard({ user, onRemove }: IUserCardProps) {
  return (
    <div className="card p-4 position-relative" style={{ width: "23rem" }}>
      <Dropdown className="position-absolute top-0 end-0 mt-2 me-2" align="end">
        <Dropdown.Toggle
          className="btn btn-link text-body border-0 p-1 user-card-menu-toggle dropdown-toggle-no-caret"
          aria-label={`Open actions for ${user.firstName} ${user.lastName}`}
          style={{ textDecoration: "none" }}
        >
          <i
            className="bi bi-three-dots-vertical pe-none fs-5"
            aria-hidden="true"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/user/edit/${user.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              if (confirm("Delete this user member?") && user.id) {
                try {
                  await userAPI.delete(user.id);
                  onRemove(user);
                  toast.success("Successfully deleted.");
                } catch (error) {
                  const message =
                    error instanceof Error
                      ? error.message
                      : "An unexpected error occurred.";
                  toast.error(message, { duration: 6000 });
                }
              }
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="d-flex align-items-start gap-3">
        <div className="d-flex flex-column">
          <span className="fs-4 fw-medium">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-secondary">@{user.username}</span>
          <span>{formatPhoneNumber(user.phone)}</span>
          <span>{user.email}</span>
          <div className="mt-3">
            {user.isManager && (
              <span className="badge text-bg-dark mt-1">Manager</span>
            )}{" "}
            {user.isAdmin && (
              <span
                className="badge mt-1"
                style={{ backgroundColor: "#ff7a00", color: "#fff" }}
              >
                Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
