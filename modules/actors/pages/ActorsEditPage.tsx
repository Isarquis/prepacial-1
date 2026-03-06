"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "@/modules/actors/ui/ActorForm";
import { ActorFormData } from "@/modules/actors/validation/actorSchema";
import { getActor, updateActor, Actor } from "@/modules/actors/services/actorsService";
import { useParams } from "next/navigation";
export default function ActorsEditPage() {

  const id= useParams().serviceId;
  const [actor, setActor] = useState<Actor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadActor = async () => {
      try {
        const data = await getActor(id);
        setActor(data);
      } catch (err) {
        setError("Error loading actor");
      }
    };

    loadActor();
  }, [id]);

  const handleUpdateActor = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await updateActor(id, data);
      router.push("/actores");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error updating actor"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!actor) {
    return <p>Cargando actor...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Actor {actor.name}
      </h1>

      <ActorForm
        onSubmit={handleUpdateActor}
        isSubmitting={isSubmitting}
        defaultValues={actor}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}