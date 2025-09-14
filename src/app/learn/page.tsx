"use client";
import { useQuery } from "@tanstack/react-query";
import PokemonSpecies from "@/components/movie";
async function fetchPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/235");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function PikachuPolling() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", 225],
    queryFn: fetchPokemon,
    refetchInterval: (query) => {
        if (query.state.data?.base_experience > 100) {
            return false;
        }
        return 5000;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Base Experience: {data.base_experience}</p>
      <PokemonSpecies name= "pidgeot" />
    </div>
  );
}
