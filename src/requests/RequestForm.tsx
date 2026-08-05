import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserContext } from "../App";
import { userAPI } from "../users/UserAPI";
import { IUser } from "../users/IUser";
import { IRequest } from "./IRequest";
import { requestAPI } from "./RequestAPI";

const emptyRequest: IRequest = {
  id: undefined,
  tableNumber: undefined,
  notes: undefined,
  status: "NEW",
  cancellationReason: undefined,
  total: 0,
  requestedAt: new Date().toISOString(),
  userId: undefined,
  requestlines: [],
};

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

      return await requestAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IRequest> = async (request) => {
    try {
      request.userId = user?.id;
      request.status = request.status || "NEW";
      delete request.user;
      delete request.requestItems;

      if (!request.id) {
        const newRequest = await requestAPI.post(request);
        toast.success("Successfully saved.");
        navigate(`/requests/detail/${newRequest.id}`);
      } else {
        await requestAPI.put(request);
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
    <form className="d-flex flex-wrap gap-4 w-75" onSubmit={handleSubmit(save)}>
      <div className="w-50">
        <label htmlFor="tableNumber" className="form-label">
          Table Number
        </label>
        <input
          id="tableNumber"
          type="number"
          {...register("tableNumber", {
            valueAsNumber: true,
            required: "Table number is required",
          })}
          className={`form-control ${errors?.tableNumber && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.tableNumber?.message}</div>
      </div>
      <div className="w-50">
        <label htmlFor="userId" className="form-label">
          User
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
      <div className="w-75">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register("notes")}
          className="form-control"
        ></textarea>
      </div>
      <div className="w-50">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          disabled={!isEdit}
          className={`form-select ${errors?.status && "is-invalid"}`}
          defaultValue="NEW"
        >
          <option value="New">New</option>
          <option value="Review">Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className="invalid-feedback">{errors?.status?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/requests" className="btn btn-outline-primary me-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save request
        </button>
      </div>
    </form>
  );
}

export default RequestForm;
