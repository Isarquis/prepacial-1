"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, MovieFormData } from "@/modules/movies/validation/movieSchema";

interface MovieFormProps {
  onSubmit: SubmitHandler<MovieFormData>;
  defaultValues?: MovieFormData;
  isSubmitting: boolean;
}

export default function MovieForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: MovieFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
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
        <label htmlFor="poster" className="block font-medium">
          Poster URL
        </label>
        <input
          id="poster"
          {...register("poster")}
          className="w-full p-2 border rounded"
        />
        {errors.poster && (
          <p className="text-red-500 text-sm mt-1">{errors.poster.message}</p>
        )}
      </div>



      <div>
        <label htmlFor="country" className="block font-medium">
          Country
        </label>
        <input
          id="country"
          {...register("country")}
          className="w-full p-2 border rounded"
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="releaseDate" className="block font-medium">
          Release Date
        </label>
        <input
          id="releaseDate"
          type="date"
          {...register("releaseDate")}
          className="w-full p-2 border rounded"
        />
        {errors.releaseDate && (
          <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>
        )}
      </div>
    



      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
      >
        {isSubmitting ? "Saving..." : "Save Movie"}
      </button>
    </form>
  );
}