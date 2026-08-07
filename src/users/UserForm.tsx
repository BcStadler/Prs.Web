import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IUser } from "./IUser";
import { userAPI } from "./UserAPI";

const emptyUser: IUser = {
  id: undefined,
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  isReviewer: false,
  isAdmin: false,
};

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: async () => {
      if (!id) {
        return emptyUser;
      }

      return await userAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IUser> = async (user) => {
    try {
      if (!user.id) {
        await userAPI.post(user);
      } else {
        await userAPI.put(user);
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
    navigate("/users");
  };

  return (
    <form className="w-75" onSubmit={handleSubmit(save)}>
      <div className="d-flex gap-3 mb-3">
        <div className="flex-fill">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="Enter first name"
            className={`form-control ${errors?.firstName && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.firstName?.message}</div>
        </div>
        <div className="flex-fill">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Enter last name"
            className={`form-control ${errors?.lastName && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.lastName?.message}</div>
        </div>
      </div>
      <div className="d-flex gap-3 mb-3">
        <div className="flex-fill">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email")}
            placeholder="Enter email address"
            className="form-control"
          />
        </div>
        <div className="flex-fill">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            placeholder="Enter phone number"
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex gap-3 mb-3">
        <div className="flex-fill">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              maxLength: { value: 50, message: "Username is too long" },
            })}
            placeholder="Enter username"
            className={`form-control ${errors?.username && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.username?.message}</div>
        </div>
        <div className="flex-fill">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              maxLength: { value: 60, message: "Password is too long" },
            })}
            placeholder="Enter password"
            className={`form-control ${errors?.password && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.password?.message}</div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label d-block">Role</label>
        <div className="form-check form-check-inline">
          <input
            {...register("isReviewer")}
            id="isReviewer"
            type="checkbox"
            className="form-check-input"
          />
          <label htmlFor="isReviewer" className="form-check-label">
            Reviewer
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            {...register("isAdmin")}
            id="isAdmin"
            type="checkbox"
            className="form-check-input"
          />
          <label htmlFor="isAdmin" className="form-check-label">
            Admin
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/users" className="btn btn-outline-primary me-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary action-button">
          <i className="bi bi-save me-2" aria-hidden="true" />
          Save user
        </button>
      </div>
    </form>
  );
}

export default UserForm;
