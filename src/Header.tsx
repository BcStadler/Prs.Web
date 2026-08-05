import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./App";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  function signout() {
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/signin");
  }

  return (
    <header>
      <div className="navbar bg-body-tertiary py-4 border-bottom">
        <div className="container-fluid">
          <Link
            to="/"
            className="d-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <svg
              width={52}
              height={21}
              viewBox="0 0 78 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#FF7A00" />
              <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#FF9736" />
              <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#FFBC7D" />
            </svg>
            <span
              className="small mx-2 fw-semibold"
              style={{ color: "#FF7A00" }}
            >
              TableServe
            </span>
          </Link>
          {user ? (
            <Dropdown className="me-4" align="end">
              <Dropdown.Toggle
                as="a"
                variant="light"
                className="d-flex text-secondary align-items-center text-decoration-none"
              >
                <div
                  style={{ width: "3rem", height: "3rem" }}
                  className="d-flex bg-primary-subtle fs-5 text-secondary align-items-center justify-content-center rounded-circle me-2"
                >
                  {user.firstName.substring(0, 1)}
                  {user.lastName.substring(0, 1)}
                </div>
                <strong>
                  {" "}
                  {user.firstName} {user.lastName}
                </strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={signout}>
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/signin" className="btn btn-primary">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
