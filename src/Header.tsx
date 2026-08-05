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
              width={75}
              height={50}
              viewBox="0 0 78 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                fill="#007AFF"
              />
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                fill="#312ECB"
              />
            </svg>
            <span
              className="medium mx-2 fw-semibold"
              style={{ color: "#000000" }}
            >
              Purchase Request System
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
