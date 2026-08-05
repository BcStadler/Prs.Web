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
  isManager: false,
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
    navigate("/user");
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
            className={`form-control ${errors?.lastName && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.lastName?.message}</div>
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
            className={`form-control ${errors?.password && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.password?.message}</div>
        </div>
      </div>
      <div className="d-flex gap-3 mb-3">
        <div className="flex-fill">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              pattern: {
                value: /^$|^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className={`form-control ${errors?.email && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.email?.message}</div>
        </div>
        <div className="flex-fill">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            className="form-control"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label d-block">Roles</label>
        <div className="form-check form-check-inline">
          <input
            {...register("isManager")}
            id="isManager"
            type="checkbox"
            className="form-check-input"
          />
          <label htmlFor="isManager" className="form-check-label">
            Manager
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
        <Link
          to="/user"
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
          Save User
        </button>
      </div>
    </form>
  );
}

export default UserForm;
