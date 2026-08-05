import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";

const emptyVendor: IVendor = {
  id: undefined,
  code: "",
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  sortOrder: undefined,
};

function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVendor>({
    defaultValues: async () => {
      if (!id) {
        return emptyVendor;
      }

      return await vendorAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IVendor> = async (vendor) => {
    try {
      if (!vendor.id) {
        await vendorAPI.post(vendor);
      } else {
        await vendorAPI.put(vendor);
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
    navigate("/vendors");
  };

  return (
    <form className="w-75" onSubmit={handleSubmit(save)}>
      <div className="mb-3">
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
      <div className="mb-3">
        <label htmlFor="sortOrder" className="form-label">
          Sort Order
        </label>
        <input
          id="sortOrder"
          type="number"
          {...register("sortOrder", {
            required: "Sort order is required",
            valueAsNumber: true,
          })}
          className={`form-control ${errors?.sortOrder && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.sortOrder?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link
          to="/vendors"
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
          style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
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
          Save Vendor
        </button>
      </div>
    </form>
  );
}

export default VendorForm;
