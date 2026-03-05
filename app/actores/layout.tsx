// src/app/actors/layout.tsx
import React from "react";
import Header from "@/shared/ui/Header";

export default function ActorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routes = [
    { name: "Actores", path: "/actores" },
    { name: "Crear", path: "/actores/services/new" },
    { name: "Mis Reservas", path: "/actors/reservations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routes} />

      <main className="flex-grow">
        {children}{" "}
        {/* The current page will be rendered here (e.g., students/page.tsx). */}
      </main>
    </div>
  );
}