"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Pokemon = {
  id: number;
  name: string;
  power: string;
};

async function fetchPokemons() {
  const res = await fetch("/api/pokemon");
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch pokemons");
  }
  return res.json();
}

async function addPokemon(pokemon: { name: string; power: string }) {
  const res = await fetch("/api/pokemon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to add pokemon");
  }
  return res.json();
}

export default function PokemonPage() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [power, setPower] = useState("");

  // Query all pokemons
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons"],
      queryFn: fetchPokemons,
      staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });

  // Mutation to add pokemon
  const mutation = useMutation({
    mutationFn: addPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
      setName("");
      setPower("");
    },
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Pokémon Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim() && power.trim()) {
                mutation.mutate({ name: name.trim(), power: power.trim() });
              }
            }}
            className="mb-6 space-y-4"
          >
            <div>
              <Input
                type="text"
                placeholder="Pokemon name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Pokemon power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={mutation.isPending || !name.trim() || !power.trim()}
              className="w-full"
            >
              {mutation.isPending ? "Adding..." : "Add Pokémon"}
            </Button>
          </form>

          {mutation.isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {(mutation.error as Error)?.message}
            </div>
          )}

          {isLoading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 rounded-full animate-spin"></div>
              <p className="mt-2">Loading pokemons...</p>
            </div>
          )}

          {isError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
              {(error as Error)?.message}
            </div>
          )}

          {data && data.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No pokemons yet. Add your first one above!
            </div>
          )}

          {data && data.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-3">
                Your Pokémons ({data.length})
              </h3>
              {data.map((p: Pokemon) => (
                <div
                  key={p.id}
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="capitalize text-lg">{p.name}</strong>
                      <p className="text-gray-600">Power: {p.power}</p>
                    </div>
                    <div className="text-sm text-gray-400">#{p.id}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
