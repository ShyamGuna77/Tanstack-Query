import { useQuery } from "@tanstack/react-query";

async function fetchPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon");
  return res.json();
}

async function fetchSpecies(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch species");
  return res.json();
}

function usePokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name),
  });
}

function useSpecies(url?: string) {
  return useQuery({
    queryKey: ["species", url],
    queryFn: () => fetchSpecies(url!),
    enabled: !!url, //  only fetch when url exists
  });
}

function usePokemonWithSpecies(name: string) {
  const pokemon = usePokemon(name);
  const speciesUrl = pokemon.data?.species?.url;
  const species = useSpecies(speciesUrl);

  return { pokemon, species };
}

export default function PokemonSpecies({ name }: { name: string }) {
  const { pokemon, species } = usePokemonWithSpecies(name);

  if (pokemon.isLoading) return <p>Loading Pokémon...</p>;
  if (pokemon.isError) return <p>Error fetching {name}</p>;

  return (
    <div>
      <h3>
        {pokemon.data.name} (id: {pokemon.data.id})
      </h3>
      {species.isLoading && <p>Loading species info...</p>}
      {species.data && (
        <p>
          Species color: {species.data.color.name} <br />
          Shape: {species.data.shape.name}
        </p>
      )}
    </div>
  );
}
