import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { IProduct } from "./IProduct";
import { IVendor } from "../vendors/IVendor";
import { productAPI } from "./ProductAPI";
import { vendorAPI } from "../vendors/VendorAPI";
import toast from "react-hot-toast";

const emptyProduct: IProduct = {
  id: undefined,
  partNumber: "",
  name: "",
  price: Number.NaN,
  unit: "",
  photoPath: "",
  vendorId: Number.NaN,
  vendor: {} as IVendor,
};

type ProductFormProps = {
  showPlaceholders?: boolean;
};

function ProductForm({ showPlaceholders = false }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [vendors, setVendors] = useState<IVendor[]>([]);

  async function loadVendors() {
    setVendors(await vendorAPI.list());
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: async () => {
      await loadVendors();
      if (!id) {
        return emptyProduct;
      }

      return await productAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IProduct> = async (product) => {
    try {
      delete product.vendor;
      if (!product.id) {
        await productAPI.post(product);
      } else {
        await productAPI.put(product);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message, { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
    navigate("/products");
  };

  const selectedVendorId = watch("vendorId");

  return (
    <form
      className="d-flex flex-column w-75 gap-2"
      onSubmit={handleSubmit(save)}
    >
      <div className="d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-25">
          <label htmlFor="partNumber" className="form-label">
            Product Number
          </label>
          <input
            id="partNumber"
            type="text"
            placeholder={showPlaceholders ? "Enter product number" : undefined}
            {...register("partNumber", {
              required: "Product number is required",
              maxLength: {
                value: 20,
                message: "Product number cannot exceed 20 characters",
              },
            })}
            className={`form-control ${errors?.partNumber && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.partNumber?.message}</div>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            placeholder={showPlaceholders ? "Enter product name" : undefined}
            {...register("name", { required: "Product name is required" })}
            className={`form-control ${errors?.name && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.name?.message}</div>
        </div>
      </div>
      <div className="d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-25">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder={showPlaceholders ? "Enter product's price" : undefined}
            {...register("price", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
              required: "Price is required",
            })}
            className={`form-control ${errors?.price && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.price?.message}</div>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="unit" className="form-label">
            Unit
          </label>
          <input
            id="unit"
            type="text"
            placeholder={showPlaceholders ? "Enter unit" : undefined}
            {...register("unit", { required: "Unit is required" })}
            className={`form-control ${errors?.unit && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.unit?.message}</div>
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="vendorId" className="form-label">
            Vendor
          </label>
          <div className="position-relative">
            <select
              id="vendorId"
              defaultValue={showPlaceholders ? "" : undefined}
              {...register("vendorId", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
                required: "Vendor is required",
              })}
              className={`form-select ${errors?.vendorId && "is-invalid"}`}
            >
              {showPlaceholders && <option value="" hidden></option>}
              {vendors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {showPlaceholders && !selectedVendorId && (
              <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary pe-none">
                Select Vendor...
              </span>
            )}
          </div>
          <div className="invalid-feedback">{errors?.vendorId?.message}</div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end w-100 gap-4 mt-4">
        <div className="d-flex justify-content-end">
          <Link to="/products" className="btn btn-outline-danger me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary action-button">
            <i className="bi bi-save me-2" aria-hidden="true" />
            Save product
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
