"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { awardSchema, AwardFormData } from "@/modules/prizes/validation/awardShema";

interface AwardFormProps {
  onSubmit: SubmitHandler<AwardFormData>;
  defaultValues?: AwardFormData;
  isSubmitting: boolean;
}

export default function AwardForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: AwardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AwardFormData>({
    resolver: zodResolver(awardSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label htmlFor="title" className="block font-medium">
          Award Title
        </label>
        <input
          id="title"
          {...register("title")}
          className="w-full p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="year" className="block font-medium">
          Year
        </label>
        <input
          id="year"
          type="number"
          {...register("year", { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
        {errors.year && (
          <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>
        <input
          id="category"
          {...register("category")}
          className="w-full p-2 border rounded"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="recipient" className="block font-medium">
          Recipient
        </label>
        <input
          id="recipient"
          {...register("recipient")}
          className="w-full p-2 border rounded"
        />
        {errors.recipient && (
          <p className="text-red-500 text-sm mt-1">{errors.recipient.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
      >
        {isSubmitting ? "Saving..." : "Save Award"}
      </button>
    </form>
  );
}