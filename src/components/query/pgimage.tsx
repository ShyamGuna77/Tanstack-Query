/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchPokemonPage,
  fetchPokemonDetails,
  PokemonDetails,
} from "@/lib/api";

export default function PgImage() {
  const [page, setPage] = useState(1);

 
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonPage(page),
    staleTime: 1000 * 60, 
  });


  const pokemonQueries = useQueries({
    queries:
      data?.results.map((pokemon) => ({
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonDetails(pokemon.url),
        staleTime: 1000 * 60,
      })) ?? [],
  });

  if (isPending) return <p>Loading Pokémon...</p>;
  if (isError) return <p>Failed to load Pokémon</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon Page {page}</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {pokemonQueries.map((q, idx) => {
          if (q.isPending) return <p key={`${idx}-loading`}>Loading...</p>;
          if (q.isError) return <p key={`${idx}-error`}>Error</p>;
          const p: PokemonDetails | undefined = q.data;
          return (
            <div
              key={p?.id}
              className="border rounded-lg p-3 flex flex-col items-center"
            >
              <img
                src={
                  p?.sprites.other?.["official-artwork"]?.front_default ||
                  p?.sprites.front_default
                }
                alt={p?.name}
                className="h-24 w-24 object-contain mb-2"
              />
              <span className="capitalize font-medium">{p?.name}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={data?.results.length === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}






