// src/modules/students/services/studentService.ts
import { Actor } from "@/modules/actors/services/actorsService";
import { fetcher } from "@/shared/services/https";
import { MovieFormData } from "../validation/movieSchema";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  duration: string;
  releaseDate: number;
  popularity: boolean;
  director: Director;
  actores: Actor[];
}

export interface Director {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  birthDate: number;
  biography: boolean;

}
export const fetchMovieServices = (): Promise<Movie[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Movie[]>("/v1/movies/");
};

export const createMovie = (data: MovieFormData): Promise<Movie> => {
  return fetcher<Movie>("/v1/movies", {
    
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};