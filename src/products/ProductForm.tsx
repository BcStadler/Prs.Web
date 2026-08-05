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
  price: 0,
  unit: "",
  photoPath: "",
  vendorId: 0,
  vendor: {} as IVendor,
};

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [vendors, setVendors] = useState<IVendor[]>([]);

  async function loadVendors() {
    setVendors(await vendorAPI.list());
  }

  const {
    register,
    handleSubmit,
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

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-75">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className={`form-control ${errors?.name && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
            required: "Price is required",
          })}
          className={`form-control ${errors?.price && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.price?.message}</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="vendorId" className="form-label">
          Vendor
        </label>
        <select
          id="vendorId"
          {...register("vendorId", {
            valueAsNumber: true,
            required: "Vendor is required",
          })}
          className={`form-select ${errors?.vendorId && "is-invalid"}`}
        >
          <option value="">Select Vendor...</option>
          {vendors.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.vendorId?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link
          to="/products"
          className="btn me-2"
          style={{
            color: "#ff0000",
            borderColor: "#ff0000",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#FF7A00", borderColor: "#FF7A00" }}
        >
          <svg
            className="bi me-2"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4.5L11.5 0H2zm0 1h9v3.5A1.5 1.5 0 0 0 12.5 6H15v8a1 1 0 0 1-1 1h-1v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm10 0.5L14.5 4H12a0.5 0.5 0 0 1-0.5-0.5v-2zM4 15v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3H4z" />
          </svg>
          Save Product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
