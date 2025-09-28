import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import homeimge from "../../assets/banner image.svg";
import SummaryChart from "../../Components/SummaryChart";

function Home() {
  const fetchSummary = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/transaction/summary",
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const {
    data: summary,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      {/* Greeting */}
      <div className="bg-purple-100 p-6 rounded-lg flex justify-between items-center gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Hi, Alyssa</h3>
          <p className="text-sm text-gray-600">
            Ready to start your day with some pitch decks?
          </p>
        </div>
        <img src={homeimge} alt="Illustration" className="w-35" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-200 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">{summary?.totalExpense ?? 0}</p>
          <p className="text-sm">Total Expense</p>
        </div>
        <div className="bg-blue-200 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">{summary?.totalIncome ?? 0}</p>
          <p className="text-sm">Total Income</p>
        </div>
        <div className="bg-pink-200 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">{summary?.balance ?? 0}</p>
          <p className="text-sm">Balance</p>
        </div>
        <div className="bg-purple-200 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">126</p>
          <p className="text-sm">Total Views</p>
        </div>
      </div>

      <div className="space-y-4">
        <SummaryChart summary={summary} />
      </div>
    </div>
  );
}

export default Home;
