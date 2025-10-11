import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/ContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.user) {
        toast.success(res.data.message || " Login successful!");
        setUser(res.data.user);
        navigate("/myapp");
      }
    } catch (err) {
      // 🔥 এখানে toastify তে exact backend error দেখাবে
      const message =
        err.response?.data?.message || " Invalid phone number or password!";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-purple-500">
          Login
        </h2>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Enter 11 digit phone number"
            {...register("phoneNumber", {
              required: "Phone number required",
              pattern: {
                value: /^\d{11}$/,
                message: "Phone number must be 11 digits",
              },
            })}
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Login
        </button>

        {/* Register Link */}
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
