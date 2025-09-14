import { useQuery } from "@tanstack/react-query";

async function fetchPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function Pokemon({ id }: { id?: number }) {
  const query = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id!), // 👈 `!` because TS complains if id is undefined
    enabled: !!id, // 👈 only run if id is truthy
  });

  if (!id) return <p>Enter a Pokémon ID</p>;
  if (query.isLoading) return <p>Loading...</p>;
  if (query.error) return <p>Error: {(query.error as Error).message}</p>;

  return (
    <div className="text-2xl font-bold flex flex-col  min-h-screen items-center justify-center">
      <h2>{query.data.name}</h2>
      <img src={query.data.sprites.front_default} alt={query.data.name} />
      
    </div>
  );
}
