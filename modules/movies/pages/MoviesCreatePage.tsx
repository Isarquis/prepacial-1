// src/modules/providers/pages/ServiceCreatePage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "@/modules/actors/ui/ActorForm";
import { ActorFormData } from "@/modules/actors/validation/actorSchema";
import {createActor} from "@/modules/actors/services/actorsService"
import MovieForm from "../ui/MovieForm";
import AwardForm from "@/modules/prizes/ui/PrizesForm";

export default function ServiceCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const handleCreateActor = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createActor(data);
      // Success! This is where we would show a global notification.
      // For now, we simply redirect.
      router.push("/actores"); // Redirect to the provider's home page
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the service."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Película</h1>
      <MovieForm onSubmit={handleCreateActor} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <h1 className="text-3xl font-bold mb-6">Crear Actores de la película</h1>

      <ActorForm/>
      <AwardForm/>
      
    </div>
  );
}