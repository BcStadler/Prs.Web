import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserContext } from "../App";
import { userAPI } from "../users/UserAPI";
import { IUser } from "../users/IUser";
import { IRequest } from "./IRequest";
import { requestsAPI } from "./RequestAPI";

const emptyRequest: IRequest = {
  id: undefined,
  description: "",
  justification: "",
  deliveryMode: "",
  status: "NEW",
  rejectionReason: undefined,
  total: 0,
  userId: undefined,
  requestLines: [],
};

function normalizeDeliveryMode(deliveryMode?: string) {
  if (!deliveryMode) return "";

  const normalized = deliveryMode.trim().toUpperCase().replace(/\s+/g, "_");

  switch (normalized) {
    case "PICKUP":
    case "DELIVERY":
    case "SIGNATURE_DELIVERY":
      return normalized;
    default:
      return deliveryMode;
  }
}

function normalizeStatus(status?: string) {
  if (!status) return "";

  const normalized = status.trim().toUpperCase().replace(/\s+/g, "_");

  switch (normalized) {
    case "NEW":
    case "REVIEW":
    case "APPROVED":
    case "REJECTED":
      return normalized;
    default:
      return status;
  }
}

function RequestForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { user } = useUserContext();
  const [userList, setUserList] = useState<IUser[]>([]);

  async function loadUser() {
    setUserList(await userAPI.list());
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequest>({
    defaultValues: async () => {
      await loadUser();

      if (!id) {
        emptyRequest.userId = user?.id;
        return emptyRequest;
      }

      const request = await requestsAPI.find(Number(id));
      return {
        ...request,
        deliveryMode: normalizeDeliveryMode(request.deliveryMode),
        status: normalizeStatus(request.status),
      };
    },
  });

  const save: SubmitHandler<IRequest> = async (request) => {
    try {
      if (!request.id) {
        request.userId = user?.id;
        request.status = "NEW";
      }

      request.status = normalizeStatus(request.status) || "NEW";
      request.deliveryMode = normalizeDeliveryMode(request.deliveryMode);
      delete request.user;

      if (!request.id) {
        const newRequest = await requestsAPI.post(request);
        toast.success("Successfully saved.");
        navigate(`/requests/detail/${newRequest.id}`);
      } else {
        await requestsAPI.put(request);
        toast.success("Successfully saved.");
        navigate(`/requests/detail/${request.id}`);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message, { duration: 6000 });
      return;
    }
  };

  return (
    <form className="request-form w-75" onSubmit={handleSubmit(save)}>
      <div className="request-form-grid">
        <div className="request-form-field">
          <label htmlFor="description" className="form-label mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter a brief description for your purchase"
            {...register("description", {
              required: "Description is required",
            })}
            className={`form-control ${errors?.description && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.description?.message}</div>
        </div>

        <div className="request-form-field">
          <label htmlFor="deliveryMode" className="form-label mb-1">
            Delivery Method
          </label>
          <select
            id="deliveryMode"
            {...register("deliveryMode", {
              required: "Delivery method is required",
            })}
            className={`form-select ${errors?.deliveryMode && "is-invalid"}`}
          >
            <option value="">Select...</option>
            <option value="PICKUP">Pickup</option>
            <option value="DELIVERY">Delivery</option>
            <option value="SIGNATURE_DELIVERY">Signature Delivery</option>
          </select>
          <div className="invalid-feedback">
            {errors?.deliveryMode?.message}
          </div>
        </div>

        <div className="request-form-field">
          <label htmlFor="justification" className="form-label mb-1">
            Justification
          </label>
          <input
            id="justification"
            type="text"
            placeholder="Enter a justification for your purchase request"
            {...register("justification", {
              required: "Justification is required",
            })}
            className={`form-control ${errors?.justification && "is-invalid"}`}
          />
          <div className="invalid-feedback">
            {errors?.justification?.message}
          </div>
        </div>

        <div className="request-form-field">
          <label htmlFor="status" className="form-label mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            disabled={!isEdit}
            className={`form-select ${errors?.status && "is-invalid"}`}
            defaultValue="NEW"
          >
            <option value="NEW">New</option>
            <option value="REVIEW">Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <div className="invalid-feedback">{errors?.status?.message}</div>
        </div>

        <div className="request-form-field request-form-field-align-end">
          <label htmlFor="userId" className="form-label mb-1">
            Requested By
          </label>
          <select
            id="userId"
            {...register("userId", {
              valueAsNumber: true,
              required: "User is required",
            })}
            disabled
            className={`form-select ${errors?.userId && "is-invalid"}`}
          >
            {userList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.userId?.message}</div>
        </div>

        <div className="request-form-actions">
          <Link to="/requests" className="btn btn-outline-primary me-2">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary d-inline-flex align-items-center"
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
            Save request
          </button>
        </div>
      </div>
    </form>
  );
}

export default RequestForm;
