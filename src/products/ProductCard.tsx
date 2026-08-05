import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { IProduct } from "./IProduct";
import { productAPI } from "./ProductAPI";
import toast from "react-hot-toast";
import { formatCurrency } from "../utility/formatUtilities";

interface IProductCardProps {
  product: IProduct;
  onRemove: (product: IProduct) => void;
}

function ProductCard({ product, onRemove }: IProductCardProps) {
  const normalizedUnit = product.unit?.trim() || "each";

  return (
    <div className="card p-4 position-relative" style={{ width: "23rem", minHeight: "17.5rem" }}>
      <Dropdown className="position-absolute top-0 end-0 mt-2 me-2" align="end">
        <Dropdown.Toggle
          className="btn btn-link text-body border-0 p-1 dropdown-toggle-no-caret"
          aria-label={`Open actions for ${product.name}`}
          style={{ textDecoration: "none" }}
        >
          <i
            className="bi bi-three-dots-vertical pe-none fs-5"
            aria-hidden="true"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/products/edit/${product.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              if (
                confirm("Are you sure you want to delete this product?") &&
                product.id
              ) {
                try {
                  await productAPI.delete(product.id);
                  onRemove(product);
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

      <div className="d-flex flex-column h-100">
        <span className="fs-4 fw-medium">{product.name}</span>
        <span className="fs-5 fw-light mb-4">
          {formatCurrency(product.price)} /{normalizedUnit}
        </span>
        <div className="mt-auto">
          <span className="d-block text-secondary mb-2">
            {product.vendor?.name || "No vendor"}
          </span>
          <span className="badge text-bg-primary-subtle text-primary-emphasis">
            {product.partNumber}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;