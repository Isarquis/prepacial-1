// src/app/movies/services/page.tsx
"use client";

import { useState } from "react";
import { useMovieServices } from "@/modules/movies/hooks/useMovieServices";
import { Movie } from "../services/movieService";
import Modal from "@/shared/ui/Modal"; // We import the Modal component.

export default function MoviesPage() {
  // We use our custom hook. All the complex logic is hidden!
  const { services, isLoading, error } = useMovieServices();

  // New state for modal visibility and selected service.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Movie | null>(null);

  const handleServiceClick = (movie: Movie) => {
    setSelectedService(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // State-based conditional rendering.
  if (isLoading) {
    return <div className="text-center p-8">Cargando servicios...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Servicios Disponibles</h1>

      <ul className="space-y-4">
        {services.map((movie) => (
          <li
            key={movie.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleServiceClick(movie)} // Hacemos el item clicable
          >
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600 mt-2">{movie.releaseDate}</p>
                        <p className="text-gray-600 mt-2">{movie.director?.name}</p>

          </li>
        ))}
      </ul>

      {/* We render the Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedService?.title ?? "Detalle del Servicio"}
      >
        {/* Modal content */}
        <p>{selectedService?.releaseDate}</p>
        <p className="mt-4 text-sm text-gray-500">
          ID del Servicio: {selectedService?.id}
        </p>
      </Modal>
    </div>
  );
}