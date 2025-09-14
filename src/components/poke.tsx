import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { RefreshCw } from "lucide-react";

type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

const TYPE_TO_BADGE_CLASS: Record<PokemonTypeName, string> = {
  normal: "bg-gray-300 text-gray-900",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-gray-900",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-400 text-gray-900",
  fighting: "bg-red-600 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-gray-900",
  rock: "bg-stone-500 text-white",
  ghost: "bg-violet-600 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-neutral-700 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-rose-400 text-gray-900",
};

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
    refetchInterval: 5000,
  });

  if (!id)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-80 h-[420px] flex items-center justify-center">
          <p className="text-center text-muted-foreground text-sm">
            Enter a Pokémon ID to get started
          </p>
        </Card>
      </div>
    );

  if (query.isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-80 h-[420px] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-sm">Loading Pokémon...</p>
          </div>
        </Card>
      </div>
    );

  if (query.error)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-80 h-[420px] border-destructive flex items-center justify-center">
          <div className="text-center text-destructive p-4">
            <p className="font-semibold text-sm">Error loading Pokémon</p>
            <p className="text-xs mt-1">{(query.error as Error).message}</p>
          </div>
        </Card>
      </div>
    );

  const pokemon = query.data;
  const imageUrl =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  type DetailTypeEntry = {
    slot: number;
    type: { name: PokemonTypeName; url: string };
  };
  const types: PokemonTypeName[] =
    (pokemon.types as DetailTypeEntry[] | undefined)?.map((t) => t.type.name) ||
    [];

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-80 h-[420px] overflow-hidden shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 flex flex-col">
        {/* Pokemon Image */}
        <div className="relative w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={100}
              height={100}
              className="object-contain"
            />
          ) : (
            <div className="text-muted-foreground text-sm">No image</div>
          )}
        </div>

       
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h2 className="text-lg font-bold capitalize truncate">
              {pokemon.name}
            </h2>
            <span className="text-sm text-muted-foreground font-mono">
              #{pokemon.id}
            </span>
          </div>

          {/* Types */}
          <div className="flex flex-wrap gap-1 mb-2 flex-shrink-0">
            {types.map((type) => (
              <Badge
                key={type}
                className={`px-2 py-0.5 text-xs font-medium ${
                  TYPE_TO_BADGE_CLASS[type] || "bg-gray-200 text-gray-900"
                }`}
              >
                {type}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-2 flex-shrink-0">
            <div className="text-center p-1.5 bg-muted rounded text-xs">
              <div className="text-muted-foreground">Height</div>
              <div className="font-semibold">
                {(pokemon.height / 10).toFixed(1)}m
              </div>
            </div>
            <div className="text-center p-1.5 bg-muted rounded text-xs">
              <div className="text-muted-foreground">Weight</div>
              <div className="font-semibold">
                {(pokemon.weight / 10).toFixed(1)}kg
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-2 flex-shrink-0">
            <div className="text-xs text-muted-foreground mb-1">Abilities</div>
            <div className="flex flex-wrap gap-1">
              {pokemon.abilities
                ?.slice(0, 2)
                .map((ability: { ability: { name: string } }) => (
                  <Badge
                    key={ability.ability.name}
                    variant="secondary"
                    className="text-xs px-1.5 py-0.5 capitalize"
                  >
                    {ability.ability.name}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1"></div>

          {/* Refetch Button - Always at bottom */}
          <Button
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            size="sm"
            className="w-full text-xs flex-shrink-0"
          >
            <RefreshCw
              className={`h-3 w-3 mr-1 ${
                query.isFetching ? "animate-spin" : ""
              }`}
            />
            {query.isFetching ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
