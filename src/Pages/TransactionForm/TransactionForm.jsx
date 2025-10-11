// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// function TransactionForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async (newTransaction) => {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/transaction/create",
//         newTransaction,
//         { withCredentials: true }
//       );
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["transactions"]);
//       queryClient.invalidateQueries(["summary"]);
//       toast.success("Transaction added successfully ");
//       reset();
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to add transaction ");
//     },
//   });

//   const onSubmit = (formData) => {
//     mutation.mutate(formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">Add Transaction</h2>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Title */}
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             placeholder="Enter transaction title"
//             {...register("title", { required: "Title is required" })}
//             className="w-full border px-3 py-2 rounded mt-1"
//           />
//           {errors.title && (
//             <p className="text-red-500">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="block font-medium">Amount</label>
//           <input
//             type="number"
//             placeholder="Enter amount"
//             {...register("amount", {
//               required: "Amount is required",
//               valueAsNumber: true,
//             })}
//             className="w-full border px-3 py-2 rounded mt-1"
//           />
//           {errors.amount && (
//             <p className="text-red-500">{errors.amount.message}</p>
//           )}
//         </div>

//         {/* Type */}
//         <div>
//           <label className="block font-medium">Type</label>
//           <select
//             {...register("type", { required: "Type is required" })}
//             className="w-full border px-3 py-2 rounded mt-1"
//           >
//             <option value="">Select Type</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//           {errors.type && <p className="text-red-500">{errors.type.message}</p>}
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block font-medium">Category</label>
//           <input
//             type="text"
//             placeholder="Enter category"
//             {...register("category", { required: "Category is required" })}
//             className="w-full border px-3 py-2 rounded mt-1"
//           />
//           {errors.category && (
//             <p className="text-red-500">{errors.category.message}</p>
//           )}
//         </div>

//         {/* Note - full width */}
//         <div className="md:col-span-2">
//           <label className="block font-medium">Note</label>
//           <textarea
//             placeholder="Add any notes (optional)"
//             {...register("note")}
//             rows={3}
//             className="w-full border px-3 py-2 rounded mt-1"
//           />
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={mutation.isLoading}
//         className="w-full bg-purple-400 text-white py-3 rounded-lg font-semibold hover:bg-purple-500 transition"
//       >
//         {mutation.isLoading ? "Saving..." : "Add Transaction"}
//       </button>
//     </form>
//   );
// }

// export default TransactionForm;

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function TransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const type = watch("type"); //  type change watch করছে

  const mutation = useMutation({
    mutationFn: async (newTransaction) => {
      console.log(newTransaction);
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
      reset();
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
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter transaction title"
            {...register("title", { required: "Title is required" })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
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
            <option value="receivable">Account Receivable</option>
            <option value="payable">Account Payable</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            {...register("category", { required: "Category is required" })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Note */}
        <div className="md:col-span-2">
          <label className="block font-medium">Note</label>
          <textarea
            placeholder="Add any notes (optional)"
            {...register("note")}
            rows={3}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* 👇 Conditional Fields for AR/AP */}
        {(type === "receivable" || type === "payable") && (
          <>
            <div>
              <label className="block font-medium">Party Name</label>
              <input
                type="text"
                placeholder="Enter party name"
                {...register("partyName", {
                  required: "Party name is required",
                })}
                className="w-full border px-3 py-2 rounded mt-1"
              />
              {errors.partyName && (
                <p className="text-red-500">{errors.partyName.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Party Contact</label>
              <input
                type="text"
                placeholder="Enter phone or email"
                {...register("partyContact", {
                  required: "Contact info is required",
                })}
                className="w-full border px-3 py-2 rounded mt-1"
              />
              {errors.partyContact && (
                <p className="text-red-500">{errors.partyContact.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
      >
        {mutation.isLoading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
