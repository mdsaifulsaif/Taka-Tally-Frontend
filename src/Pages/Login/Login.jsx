import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/ContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://taka-tally-server.onrender.com/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.user) {
        toast.success(res.data.message || "Login successful!");
        setUser(res.data.user);
        console.log("Updated user:", res.data.user);
        navigate("/myapp");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex px-5 items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-400 text-center">
          Login
        </h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500 transition"
        >
          Login
        </button>

        {/* Extra text for Register */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
