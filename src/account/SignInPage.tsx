import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
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
      navigate("/orders");
    } catch {
      toast.error("Unsuccessful sign in. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/orders");
    }
  }, [user, navigate]);

  return (
    <main className="signin d-flex flex-column gap-4 justify-content-center align-items-center">
      <svg
        width={100}
        height={78}
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#FF7A00" />
        <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#FF9736" />
        <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#FFBC7D" />
      </svg>
      <span className="mx-2 fw-semibold" style={{ color: "#FF7A00" }}>
        TableServe
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
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`form-control ${errors?.password && "is-invalid"}`}
            />
            <div className="invalid-feedback">{errors?.password?.message}</div>
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
