import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "./App";

function AppNav() {
  const location = useLocation();
  const { user } = useUserContext();
  const isAdmin = !!user?.isAdmin;

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
          <i className="bi bi-cart pe-none me-2" aria-hidden="true" />
          Requests
        </Nav.Link>
      </Nav.Item>
      {isAdmin && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/products" as={Link} to="/products">
            <i className="bi bi-card-list pe-none me-2" aria-hidden="true" />
            Products
          </Nav.Link>
        </Nav.Item>
      )}
      {isAdmin && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/vendors" as={Link} to="/vendors">
            <i className="bi bi-briefcase pe-none me-2" aria-hidden="true" />
            Vendors
          </Nav.Link>
        </Nav.Item>
      )}
      {isAdmin && (
        <Nav.Item as="li">
          <Nav.Link eventKey="/users" as={Link} to="/users">
            <i className="bi bi-person pe-none me-2" aria-hidden="true" />
            Users
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default AppNav;
