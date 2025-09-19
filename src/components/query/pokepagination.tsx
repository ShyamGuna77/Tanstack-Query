/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

async function fetchPokemons(
  page: number,
  limit: number
): Promise<PokemonResponse> {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch pokemon details");
  return res.json();
}

function getPokemonImageUrl(pokemon: Pokemon): string {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
  );
}

export default function PokemonPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page, limit),
    placeholderData: keepPreviousData,
  });

 
  const pokemonDetailsQueries = useQuery({
    queryKey: ["pokemon-details", data?.results],
    queryFn: async () => {
      if (!data?.results) return [];
      const details = await Promise.all(
        data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );
      return details;
    },
    enabled: !!data?.results,
    placeholderData: keepPreviousData,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const pokemonDetails = pokemonDetailsQueries.data || [];
  const totalPages = Math.ceil((data?.count || 0) / limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pokémon List (Page {page} of {totalPages})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.results.map((pokemon, index) => {
          const pokemonDetail = pokemonDetails[index];
          const imageUrl = pokemonDetail
            ? getPokemonImageUrl(pokemonDetail)
            : "";

          return (
            <div
              key={pokemon.name}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  {pokemonDetail ? (
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin"></div>
                  )}
                </div>
                <h3 className="font-semibold text-lg capitalize">
                  {pokemon.name}
                </h3>
                {pokemonDetail && (
                  <p className="text-sm text-gray-600">#{pokemonDetail.id}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || isPlaceholderData}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPlaceholderData || !data?.next}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
