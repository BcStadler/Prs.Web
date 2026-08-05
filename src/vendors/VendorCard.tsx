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
    <div className="card p-4 position-relative" style={{ width: "23rem" }}>
      <Dropdown className="position-absolute top-0 end-0 mt-2 me-2" align="end">
        <Dropdown.Toggle
          className="btn btn-link text-body border-0 p-1 dropdown-toggle-no-caret"
          aria-label={`Open actions for ${vendor.name}`}
          style={{ textDecoration: "none" }}
        >
          <i
            className="bi bi-three-dots-vertical pe-none fs-5"
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

      <div className="d-flex flex-column gap-2">
        <span className="fs-4 fw-medium">
          {vendor.name}
          <span className="badge text-bg-dark ms-2">{vendor.code}</span>
        </span>
        <span className="text-secondary">{vendor.address}</span>
        <span className="text-secondary">
          {vendor.city}, {vendor.state} {vendor.zip}
        </span>
        {vendor.phone && <span>{formatPhoneNumber(vendor.phone)}</span>}
        {vendor.email && <span>{vendor.email}</span>}
      </div>
    </div>
  );
}

export default VendorCard;