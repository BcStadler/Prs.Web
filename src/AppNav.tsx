import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "./App";

function AppNav() {
  const location = useLocation();
  const { user } = useUserContext();
  const isAdmin = !!user?.isAdmin;
  const canManage = isAdmin || !!user?.isReviewer;

  return (
    <Nav
      variant="pills"
      defaultActiveKey={location.pathname}
      as="ul"
      className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end min-vh-100 position-sticky"
      style={{ width: 280 }}
    >
      <Nav.Item as="li" className="text-secondary fs-4 fw-semi-bold mb-2">
        Purchase
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="/requests" as={Link} to="/requests">
          <svg
            className="bi pe-none me-2"
            width={16}
            height={16}
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .49.402L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.61 2H.5A.5.5 0 0 1 0 1.5ZM4.102 4l1.313 7h7.17l1.313-7H4.102ZM5 12.5A1.5 1.5 0 1 0 5 15a1.5 1.5 0 0 0 0-2.5Zm7 0A1.5 1.5 0 1 0 12 15a1.5 1.5 0 0 0 0-2.5Z" />
          </svg>
          Requests
        </Nav.Link>
      </Nav.Item>
      {canManage && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/products" as={Link} to="/products">
            <svg
              className="bi pe-none me-2"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
              <path d="M3 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm8 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg>
            Products
          </Nav.Link>
        </Nav.Item>
      )}
      {canManage && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/vendors" as={Link} to="/vendors">
            <svg
              className="bi pe-none me-2"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1H6a.5.5 0 0 1 .354.146L7.707 2.5H12.5A1.5 1.5 0 0 1 14 4v1.5a.5.5 0 0 1-.5.5H13v6.5A1.5 1.5 0 0 1 11.5 14h-8A1.5 1.5 0 0 1 2 12.5v-10ZM3.5 2a.5.5 0 0 0-.5.5V3h4.293l-1-1H3.5Zm9 3V4a.5.5 0 0 0-.5-.5H3v1.5h9.5Z" />
            </svg>
            Vendors
          </Nav.Link>
        </Nav.Item>
      )}
      {canManage && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/users" as={Link} to="/users">
            <svg
              className="bi pe-none me-2"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1c-2.355 0-4.5 1.5-4.5 3.5V14h9v-1.5C12.5 10.5 10.355 9 8 9Z" />
            </svg>
            Users
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default AppNav;