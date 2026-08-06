import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "../utility/formatUtilities";

interface IVendorCardProps {
  vendor: IVendor;
  onRemove: (vendor: IVendor) => void;
}

function VendorCard({ vendor, onRemove }: IVendorCardProps) {
  return (
    <div className="card" style={{ width: "23rem" }}>
      <div className="progress">
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: "60%" }}
        />
      </div>

      <address className="py-4 px-4 mb-0">
        <Dropdown className="d-flex justify-content-end" align="end">
          <Dropdown.Toggle
            className="btn btn-light border-0 p-0 dropdown-toggle-no-caret"
            aria-label={`Open actions for ${vendor.name}`}
            style={{ background: "none" }}
          >
            <i
              className="bi bi-three-dots-vertical pe-none me-2"
              style={{ color: "#000" }}
              aria-hidden="true"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/vendors/edit/${vendor.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("Delete this vendor?") && vendor.id) {
                  try {
                    await vendorAPI.delete(vendor.id);
                    onRemove(vendor);
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

        <br />
        <span className="fs-4 lh-l fw-medium">{vendor.name}</span>
        <br />
        <div className="badge text bg-secondary mt-1">{vendor.code}</div>
        <br />
        <br />
        <p className="mb-1 text-secondary small">{vendor.address}</p>
        <p className="mb-1 text-secondary small">
          {vendor.city}, {vendor.state} {vendor.zip}
        </p>
        {vendor.phone && (
          <p className="mb-1 text-secondary small">
            {formatPhoneNumber(vendor.phone)}
          </p>
        )}
        {vendor.email && (
          <p className="mb-0 text-secondary small">{vendor.email}</p>
        )}
      </address>
    </div>
  );
}

export default VendorCard;
