import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import LoadingPage from "../../Components/LoadingPage";

function IncomeList() {
  // fetch expenses only
  const fetchExpenses = async () => {
    const { data } = await axios.get(
      "https://taka-tally-server.onrender.com/api/transaction/all-incomes",
      { withCredentials: true }
    );
    return data.incomes || [];
  };

  const {
    data: incomes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <p className="text-center mt-4 text-red-500">Error loading expenses</p>
    );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Income Statements</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Note</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes?.map((e) => (
            <tr key={e._id} className="border-b hover:bg-gray-50 transition">
              <td className="py-2 px-4 flex items-center gap-2">
                <FaArrowUp className="text-green-600" />
                {e.title}
              </td>
              <td className="py-2 px-4 font-semibold text-green-600">
                ৳{e.amount}
              </td>
              <td className="py-2 px-4">{e.category}</td>
              <td className="py-2 px-4">{e.note}</td>
              <td className="py-2 px-4">
                {new Date(e.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeList;
