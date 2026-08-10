import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../users/UserAPI";
import { useUserContext } from "../App";
import { IUser } from "../users/IUser";

interface IAccount {
  username: string;
  password: string;
}

function persistUsers(user: IUser) {
  localStorage.setItem("user", JSON.stringify(user));
}

function SignInPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>({
    defaultValues: async () => ({ username: "", password: "" }),
  });

  const signin: SubmitHandler<IAccount> = async (account) => {
    try {
      const { password: _, ...safeUser } = await userAPI.findByAccount(
        account.username,
        account.password,
      );
      void _;
      persistUsers(safeUser as IUser);
      setUser(safeUser as IUser);
      navigate("/requests");
    } catch {
      toast.error("Unsuccessful sign in. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/requests");
    }
  }, [user, navigate]);

  return (
    <main className="signin d-flex flex-column gap-4 justify-content-center align-items-center">
      <svg
        width={150}
        height={100}
        viewBox="0 0 50 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          fill="#007AFF"
        />
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          fill="#312ECB"
        />
      </svg>
      <span className="mx-2 fs-3 mx-lg-4 fw-semibold text-dark">
        Purchase Request System
      </span>

      <div className="card w-25 p-4">
        <h4 className="card-title">Sign in</h4>
        <form className="d-flex flex-column" onSubmit={handleSubmit(signin)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className={`form-control ${errors?.username && "is-invalid"}`}
            />
            <div className="invalid-feedback">{errors?.username?.message}</div>
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group has-validation">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`form-control ${errors?.password && "is-invalid"}`}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                <i
                  className={`bi ${isPasswordVisible ? "bi-eye-slash" : "bi-eye"}`}
                  aria-hidden="true"
                />
              </button>
              <div className="invalid-feedback">
                {errors?.password?.message}
              </div>
            </div>
          </div>
          <div className="mb-4 form-text">
            <a href="#">Forgot It?</a>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignInPage;
