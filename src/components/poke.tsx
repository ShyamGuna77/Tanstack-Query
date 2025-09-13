"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchPokemon(id: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 2s timeout

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`pokemon with id ${id} not found`);
  return res.json();
}

const Pokemon = ({ id }: { id: number }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async ({ queryKey }) => {
      const [_, name] = queryKey;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });
  return (
    <div>
      {isLoading && (
        <div className="text-2xl font-bold flex flex-col  min-h-screen items-center justify-center">
          Loading...
        </div>
      )}
      {isError && (
        <div className="text-2xl font-bold flex flex-col  min-h-screen items-center justify-center">
          Error {error.message}
        </div>
      )}
      {data && (
        <div className="text-2xl font-bold flex  items-center justify-center">
          {data.name}
        </div>
      )}
    </div>
  );
};

export default Pokemon;
