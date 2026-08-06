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
    <div
      className="card position-relative"
      style={{ width: "23rem", minHeight: "18.75rem" }}
    >
      <div className="progress">
        <div
          className="progress-bar bg-primary-subtle"
          role="progressbar"
          style={{ width: "30%" }}
          aria-label="Product card accent"
        />
      </div>

      <address className="py-4 px-4 mb-0 h-100 d-flex flex-column">
        <div className="d-flex justify-content-end">
          <Dropdown className="d-inline" align="end">
            <Dropdown.Toggle
              className="btn btn-light border-0 p-1 dropdown-toggle-no-caret"
              aria-label={`Open actions for ${product.name}`}
              style={{ background: "none", textDecoration: "none" }}
            >
              <i
                className="bi bi-three-dots-vertical pe-none fs-5"
                aria-hidden="true"
                style={{ color: "#007AFF" }}
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
        </div>

        <span className="fs-4 lh-1 fw-medium mt-3">{product.name}</span>
        <span className="fs-5 fw-light mt-1">
          {formatCurrency(product.price)}/{normalizedUnit}
        </span>

        <div className="mt-auto pt-4">
          <span className="fs-6 fw-medium d-block">
            {product.vendor?.name || "No vendor"}
          </span>
          <div className="badge text-secondary bg-primary-subtle mt-2">
            {product.partNumber}
          </div>
        </div>
      </address>
    </div>
  );
}

export default ProductCard;
