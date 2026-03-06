// src/app/students/services/page.tsx
"use client";

import { act, use, useState } from "react";
import { useActorServices } from "@/modules/actors/hooks/useActorService";
import { Actor, updateActor } from "@/modules/actors/services/actorsService";
import Modal from "@/shared/ui/Modal"; // We import the Modal component.
import {useRouter} from "next/navigation";
import { deleteActor } from "@/modules/actors/services/actorsService";
import { ActorFormData } from "../validation/actorSchema";
import { global } from "styled-jsx/css";
export default function ServicesPage() {
  // We use our custom hook. All the complex logic is hidden!
  const { services, isLoading, error } = useActorServices();

  // New state for modal visibility and selected service.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Actor | null>(null);
  const router = useRouter(); // Get the router to redirect
  const[ fail, setFail]= useState<string | null>(null);

  const handleServiceClick = (actor: Actor) => {
    setSelectedService(actor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleEdit=async(actor: Actor)=>{
    router.push("actores/services/"+actor.id+"/edit")
  }


  const handleDelete = async (id: string) => {

      try {
        await deleteActor(id);
        router.push("/actores");
      } catch (err) {
        setFail(
          err instanceof Error
            ? err.message
            : "An error occurred while creating the service."
        );
      } finally {
      }
      window.location.reload();
  }

  // State-based conditional rendering.
  if (isLoading) {
    return <div className="text-center p-8">Cargando ...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }



  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6"> Listado de Actores</h1>

      <ul className="space-y-4">
        {services.map((actor) => (
<li
  key={actor.id}
  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
>
  <div className="flex flex-col md:flex-row items-start gap-4">

    {/* Imagen */}
    <img
      src={actor.photo}
      alt={actor.name}
      className="w-full md:w-40 h-auto object-cover rounded"
    />

    {/* Información */}
    <div className="flex-1">
      <h2 className="text-xl font-semibold">{actor.name}</h2>
      <p className="text-gray-600 mt-2">{actor.biography}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button className="button" onClick={() => handleDelete(actor.id)}>
          Delete
        </button>

        <button className="button" onClick={() => handleServiceClick(actor)}>
          Detail
        </button>

        <button className="button" onClick={() => handleEdit(actor)}>
          Edit
        </button>
      </div>
    </div>

  </div>
</li>
          
        ))}
      </ul>

      {/* We render the Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedService?.name ?? "Detalle del Actor"}
      >
        {/* Modal content */}
        <p>{selectedService?.biography}</p>
        <p className="mt-4 text-sm text-gray-500">
          ID del Actor: {selectedService?.id}
        </p>

      </Modal>
    </div>
  );
}