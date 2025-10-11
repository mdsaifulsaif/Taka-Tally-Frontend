import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const EditTransaction = () => {
  const { id } = useParams(); // URL থেকে transaction ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    note: "",
    date: "",
  });

  // 🔹 Input change হ্যান্ডেল
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/transactions/${id}`,
        formData
      );
      alert("Transaction updated successfully!");
      navigate("/transactions"); // redirect to list page
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Note"
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date ? formData.date.split("T")[0] : ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
