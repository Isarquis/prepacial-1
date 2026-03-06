// src/modules/students/services/studentService.ts
import { fetcher } from "@/shared/services/https";
import { ActorFormData } from "../validation/actorSchema";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
export interface Actor {
  id: string;
  name: string;
  photo:string;
  nationality: string;
  birthDate: string;
  biography: string;
}

export const fetchActorsServices = (): Promise<Actor[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Actor[]>("/v1/actors");
};

export const createActor = (data: ActorFormData): Promise<Actor> => {
  return fetcher<Actor>("/v1/actors", {
    
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

export const deleteActor = (id: string): Promise<Actor> => {
  return fetcher<Actor>("/v1/actors/" + id, {
    method: "DELETE",
  });
};

export const updateActor = (data: ActorFormData): Promise<Actor> => {
  return fetcher<Actor>("/v1/actors/", {
    method: "UPDATE",
  });
};