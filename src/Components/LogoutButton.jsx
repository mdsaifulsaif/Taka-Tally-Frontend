import React, { use, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/ContextProvider";

function LogoutButton() {
  const { setUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully");

      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w/full items-center gap-2 px-3 py-2 rounded text-red-600 transition font-semibold cursor-pointer"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutButton;
