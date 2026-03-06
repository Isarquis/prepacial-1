"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {serviceSchema,ActorFormData,} from "@/modules/actors/validation/actorSchema";

interface ActorFormProps {
  onSubmit: SubmitHandler<ActorFormData>;
  defaultValues?: ActorFormData;
  isSubmitting: boolean;
}

export default function ActorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ActorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActorFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="photo" className="block font-medium">
          Photo URL
        </label>
        <input
          id="photo"
          {...register("photo")}
          className="w-full p-2 border rounded"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nationality" className="block font-medium">
          Nationality
        </label>
        <input
          id="nationality"
          {...register("nationality")}
          className="w-full p-2 border rounded"
        />
        {errors.nationality && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nationality.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-medium">
          Birthday
        </label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate")}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="biography" className="block font-medium">
          Biography
        </label>
        <textarea
          id="biography"
          {...register("biography")}
          className="w-full p-2 border rounded"
        />
        {errors.biography && (
          <p className="text-red-500 text-sm mt-1">
            {errors.biography.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
      >
        {isSubmitting ? "Saving..." : "Save Actor"}
      </button>
    </form>
  );
}