// src/modules/providers/pages/ServiceCreatePage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "@/modules/actors/ui/ActorForm";
import { ActorFormData } from "@/modules/actors/validation/actorSchema";
import {createActor} from "@/modules/actors/services/actorsService"

export default function ServiceCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const handleCreateService = async (data: ActorFormData) => {
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
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Servicio</h1>
      <ActorForm onSubmit={handleCreateService} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}