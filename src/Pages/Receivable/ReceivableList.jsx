import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Components/LoadingPage";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const fetchReceivables = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/transaction/all-receivable",
    { withCredentials: true }
  );
  return data?.receivable || [];
};

const ReceivableList = () => {
  const queryClient = useQueryClient(); // ✅ এটা খুব গুরুত্বপূর্ণ

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["receivable"],
    queryFn: fetchReceivables,
  });

  const [selected, setSelected] = useState(null);

  // ✅ Mutation for updating status
  const { mutate: updateStatus, isLoading: updating } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axios.put(
        `http://localhost:5000/api/transaction/update-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      // ✅ সফল হলে data রিফ্রেশ করবে
      queryClient.invalidateQueries(["receivable"]);
    },
  });

  // ✅ Status toggle handler
  function handleReceivable(id, currentStatus) {
    const newStatus = currentStatus === "pending" ? "paid" : "pending";
    updateStatus({ id, status: newStatus });
  }

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">
        Error: {error.message || "Failed to fetch data"}
      </p>
    );

  return (
    <div className="overflow-x-auto relative">
      <h2 className="text-xl font-bold mb-4">Receivable Statements</h2>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e) => (
            <tr
              key={e._id}
              className="border-b hover:bg-gray-50 transition text-gray-800"
            >
              <td className="py-2 px-4 flex items-center gap-2">
                <FaMoneyBillTrendUp className="text-green-500" />
                {e.title}
              </td>
              <td className="py-2 px-4 font-semibold text-green-600">
                ৳{e.amount}
              </td>
              <td className="py-2 px-4 text-sm text-gray-500">
                {new Date(e.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">{e.category}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleReceivable(e._id, e.status)}
                  disabled={updating}
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    e.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {updating
                    ? "Updating..."
                    : e.status === "paid"
                    ? "Paid"
                    : "Pending"}
                </button>
              </td>

              <td className="py-2 px-4">
                <button
                  onClick={() => setSelected(e)}
                  className="bg-emerald-500 text-white px-3 py-1 text-sm rounded-md hover:bg-emerald-600 transition"
                >
                  See Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <IoMdClose size={24} />
            </button>

            <h3 className="text-xl font-bold text-emerald-600 mb-4">
              Receivable Details
            </h3>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Title:</strong> {selected.title}
              </p>
              <p>
                <strong>Name:</strong> {selected.partyName}
              </p>
              <p>
                <strong>Contact Number:</strong> {selected.partyContact}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  ৳{selected.amount}
                </span>
              </p>
              <p>
                <strong>Category:</strong> {selected.category}
              </p>
              <p>
                <strong>Note:</strong> {selected.note || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selected.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selected.status === "pending"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {selected.status}
                </span>
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelected(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivableList;
