import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
import LoadingPage from "./../../Components/LoadingPage";
import { Link } from "react-router";

function TransactionList() {
  const fetchTransactions = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/transaction/all-transaction",
      { withCredentials: true }
    );
    return data.statements;
  };

  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading transactions
      </p>
    );

  return (
    <div className="flex flex-col items-start w-full p-4">
      <h2 className="text-xl font-bold mb-4">All Statements</h2>

      {/* Table container */}
      <div className="overflow-x-auto w-full">
        <table className="table-auto min-w-[600px] w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Note</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4 flex items-center gap-2">
                  {t.type === "income" ? (
                    <FaArrowUp className="text-green-500" />
                  ) : (
                    <FaArrowDown className="text-red-500" />
                  )}
                  {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </td>
                <td className="py-2 px-4">{t.title}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ৳{t.amount}
                </td>
                <td className="py-2 px-4">{t.category}</td>
                <td className="py-2 px-4">{t.note}</td>
                <td className="py-2 px-4">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-3">
                    <Link to={`/myapp/statements/${t._id}`}>
                      <FaEdit />
                    </Link>{" "}
                    <button className=" cursor-pointer ">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
