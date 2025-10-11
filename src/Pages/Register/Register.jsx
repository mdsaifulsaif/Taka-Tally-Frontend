import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/ContextProvider";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        { withCredentials: true }
      );

      const newUser = res.data.user || res.data.newUser;
      if (newUser) {
        const safeUser = {
          _id: newUser._id,
          phoneNumber: newUser.phoneNumber,
          name: newUser.name,
          email: newUser.email,
        };

        setUser(safeUser);
        toast.success(res.data.message || "Registration successful!");
        console.log("Updated user:", safeUser);
        navigate("/myapp");
      }

      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-400 text-center">
          Register
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...formRegister("name", { required: "Name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Enter your email"
            {...formRegister("phoneNumber", {
              required: "Phone Number is required",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...formRegister("email", { required: "Email is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            {...formRegister("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.type === "minLength"
                ? "Password must be at least 6 characters"
                : errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 px-4 rounded-xl hover:bg-purple-500 transition"
        >
          Register
        </button>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
