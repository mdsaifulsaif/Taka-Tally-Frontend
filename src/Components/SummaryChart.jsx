import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function SummaryChart({ summary }) {
  const data = [
    { name: "Income", value: summary?.totalIncome || 0 },
    { name: "Expense", value: summary?.totalExpense || 0 },
    { name: "Balance", value: summary?.balance || 0 },
  ];

  return (
    <div className="w-full h-50">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SummaryChart;
