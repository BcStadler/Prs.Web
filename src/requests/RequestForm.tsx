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
    <form className="w-75" onSubmit={handleSubmit(save)}>
      <div className="d-flex flex-wrap gap-4">
        <div style={{ minWidth: "45%", maxWidth: "50%" }}>
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

        <div style={{ minWidth: "45%", maxWidth: "50%" }}>
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

        <div style={{ minWidth: "45%", maxWidth: "50%" }}>
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

        <div style={{ minWidth: "45%", maxWidth: "50%" }}>
          <label htmlFor="status" className="form-label mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            disabled={!isEdit}
            className={`form-select ${errors?.status && "is-invalid"}`}
          >
            <option value="NEW">New</option>
            <option value="REVIEW">Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <div className="invalid-feedback">{errors?.status?.message}</div>
        </div>

        <div style={{ minWidth: "45%", maxWidth: "50%" }} aria-hidden="true" />

        <div style={{ minWidth: "45%", maxWidth: "50%" }}>
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

          <div className="d-flex justify-content-end gap-2 pt-4 mt-2">
            <Link to="/requests" className="btn btn-outline-primary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary action-button">
              <i className="bi bi-save me-2" aria-hidden="true" />
              Save request
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RequestForm;
