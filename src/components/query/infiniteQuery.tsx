/* eslint-disable @next/next/no-img-element */
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 12;

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

async function fetchPokemons({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${pageParam}`
  );
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  const data: PokemonListResponse = await res.json();
  return data;
}

export default function PokemonInfinite() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    initialPageParam: 20,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.next) return undefined;
      return lastPageParam + PAGE_SIZE;
    },
    getPreviousPageParam: (_firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 0) return undefined;
      return Math.max(firstPageParam - PAGE_SIZE, 0);
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pokémon Infinite Scroll</h1>

      {status === "pending" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="border p-4 rounded animate-pulse h-28" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600">{(error as Error)?.message}</div>
      )}

      {data?.pages.map((page, i) => (
        <div
          key={i}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4"
        >
          {page.results.map((pokemon: { name: string; url: string }) => {
            const id = pokemon.url.split("/").filter(Boolean).pop();
            return (
              <div
                key={pokemon.name}
                className="border p-3 rounded text-center hover:shadow transition-shadow"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="h-16 w-16 mx-auto"
                />
                <p className="capitalize mt-2 text-sm font-medium">
                  {pokemon.name}
                </p>
              </div>
            );
          })}
        </div>
      ))}

      <div className="mt-6 flex items-center justify-center gap-3">
 

        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "No More Pokémon"}
        </button>
      </div>
    </div>
  );
}
