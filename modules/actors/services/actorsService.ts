// src/modules/students/services/studentService.ts
import { fetcher } from "@/shared/services/https";
import { ActorFormData } from "../validation/actorSchema";
export interface Service {
  id: string;
  name: string;
  photo:string;
  nationality: string;
  birthDate: string;
  biography: string;
}

export const fetchActorsServices = (): Promise<Service[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Service[]>("/v1/actors");
};

export const createActor = (data: ActorFormData): Promise<Service> => {
  return fetcher<Service>("/v1/actors", {
    
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};