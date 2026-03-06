// src/hooks/useStudentServices.ts
"use client"; // Hooks that use useState/useEffect should be for the client.

import { useState, useEffect } from "react";
import { Movie, fetchMovieServices } from "@/modules/movies/services/movieService";

export function useMovieServices() {
  const [services, setServices] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        // We reset the status with each new load
        setIsLoading(true);
        setError(null);
        const data = await fetchMovieServices();
        setServices(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []); // Empty array so that it runs only once.

  // We return the state and, potentially, functions to reload.
  return { services, isLoading, error };
}