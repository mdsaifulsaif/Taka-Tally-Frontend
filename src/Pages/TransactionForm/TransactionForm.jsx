import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTransaction) => {
      const { data } = await axios.post(
        "http://localhost:5000/api/transaction/create",
        newTransaction,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["summary"]);
      toast.success("Transaction added successfully ");
      reset(); // form reset
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add transaction ");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      {/* Title */}
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full border px-3 py-2 rounded mt-1"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
          })}
          className="w-full border px-3 py-2 rounded mt-1"
        />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block font-medium">Type</label>
        <select
          {...register("type", { required: "Type is required" })}
          className="w-full border px-3 py-2 rounded mt-1"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          {...register("category", { required: "Category is required" })}
          className="w-full border px-3 py-2 rounded mt-1"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Note */}
      <div>
        <label className="block font-medium">Note</label>
        <textarea
          {...register("note")}
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        {mutation.isLoading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
