import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";

const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

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
};

type VendorFormProps = {
  showPlaceholders?: boolean;
};

function VendorForm({ showPlaceholders = false }: VendorFormProps) {
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

      const vendor = await vendorAPI.find(Number(id));
      return {
        ...vendor,
        state: vendor.state?.trim().toUpperCase() || "",
      };
    },
  });

  const save: SubmitHandler<IVendor> = async (vendor) => {
    try {
      vendor.state = vendor.state?.trim().toUpperCase() || "";
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
    <form
      className="d-flex flex-column gap-4 w-100"
      onSubmit={handleSubmit(save)}
    >
      <div className="d-flex flex-wrap gap-4 w-100">
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 160, maxWidth: 180 }}
        >
          <label htmlFor="code" className="form-label">
            Vendor Code
          </label>
          <input
            id="code"
            type="text"
            placeholder={
              showPlaceholders ? "Enter short vendor code" : undefined
            }
            {...register("code", {
              required: "Vendor code is required",
              maxLength: {
                value: 7,
                message: "Vendor code cannot exceed 7 characters",
              },
            })}
            className={`form-control ${errors?.code && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.code?.message}</div>
        </div>
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 160, maxWidth: 320 }}
        >
          <label htmlFor="name" className="form-label">
            Vendor Name
          </label>
          <input
            id="name"
            type="text"
            placeholder={showPlaceholders ? "Enter vendor name" : undefined}
            {...register("name", { required: "Vendor name is required" })}
            className={`form-control ${errors?.name && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.name?.message}</div>
        </div>
      </div>

      <div className="mb-3" style={{ maxWidth: "50%" }}>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          id="address"
          type="text"
          placeholder={showPlaceholders ? "Enter vendor's address" : undefined}
          {...register("address", { required: "Address is required" })}
          className={`form-control ${errors?.address && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.address?.message}</div>
      </div>

      <div className="d-flex flex-wrap gap-4 w-100">
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 220, maxWidth: 300 }}
        >
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder={showPlaceholders ? "Enter city" : undefined}
            {...register("city", { required: "City is required" })}
            className={`form-control ${errors?.city && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.city?.message}</div>
        </div>
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 150, maxWidth: 170 }}
        >
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            id="state"
            {...register("state", {
              validate: (value) => !!value || "State is required",
            })}
            className={`form-select ${errors?.state && "is-invalid"}`}
          >
            <option value="">Select state...</option>
            {usStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.state?.message}</div>
        </div>
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 140, maxWidth: 150 }}
        >
          <label htmlFor="zip" className="form-label">
            Zip
          </label>
          <input
            id="zip"
            type="text"
            placeholder={showPlaceholders ? "Enter zip code" : undefined}
            {...register("zip", { required: "Zip is required" })}
            className={`form-control ${errors?.zip && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.zip?.message}</div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-4 w-100">
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 220, maxWidth: 300 }}
        >
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder={showPlaceholders ? "Enter phone number" : undefined}
            {...register("phone")}
            className="form-control"
          />
        </div>
        <div
          className="mb-3 flex-grow-1"
          style={{ minWidth: 220, maxWidth: 300 }}
        >
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder={showPlaceholders ? "Enter email address" : undefined}
            {...register("email")}
            className="form-control"
          />
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end mt-3">
        <Link to="/vendors" className="btn btn-outline-danger">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary action-button">
          <i className="bi bi-save me-2" aria-hidden="true" />
          Save vendor
        </button>
      </div>
    </form>
  );
}

export default VendorForm;
