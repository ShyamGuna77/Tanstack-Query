"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, History, Star } from "lucide-react";

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

type PokemonDetails = {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonTypeName[];
  height: number;
  weight: number;
  abilities: string[];
};

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

async function fetchPokemonList(limit: number = 1000) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

async function fetchPokemon(search: string): Promise<PokemonDetails> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
    {
      signal: controller.signal,
    }
  );
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`Pokemon "${search}" not found`);
  const data = await res.json();

  const id: number = data.id;
  const imageFromOfficial: string | null =
    data?.sprites?.other?.["official-artwork"]?.front_default || null;
  const fallbackSprite: string | null = data?.sprites?.front_default || null;
  const imageUrl: string = imageFromOfficial || fallbackSprite || "/vercel.svg";

  type DetailTypeEntry = {
    slot: number;
    type: { name: PokemonTypeName; url: string };
  };
  const types: PokemonTypeName[] =
    (data.types as DetailTypeEntry[] | undefined)?.map((t) => t.type.name) ||
    [];

  type AbilityEntry = {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  };
  const abilities: string[] =
    (data.abilities as AbilityEntry[] | undefined)?.map(
      (a) => a.ability.name
    ) || [];

  return {
    id,
    name: data.name,
    imageUrl,
    types,
    height: data.height / 10, // Convert to meters
    weight: data.weight / 10, // Convert to kg
    abilities,
  };
}

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch Pokemon list for autocomplete
  const { data: pokemonList } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch specific Pokemon
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["pokemon", search],
    queryFn: () => fetchPokemon(search),
    enabled: false, // Only fetch when manually triggered
  });

  // Filter suggestions based on search input
  const suggestions =
    pokemonList?.results
      ?.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8) || [];

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      setSearch(searchTerm);
      setShowSuggestions(false);
      refetch();

      // Add to search history
      setSearchHistory((prev) => {
        const newHistory = [
          searchTerm,
          ...prev.filter((item) => item !== searchTerm),
        ].slice(0, 10);
        localStorage.setItem(
          "pokemon-search-history",
          JSON.stringify(newHistory)
        );
        return newHistory;
      });
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (pokemonName: string) => {
    handleSearch(pokemonName);
  };

  // Toggle favorite
  const toggleFavorite = (pokemonId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId];
      localStorage.setItem("pokemon-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("pokemon-search-history");
    const savedFavorites = localStorage.getItem("pokemon-favorites");
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Pokemon Search
        </h1>
        <p className="text-muted-foreground">
          Search for any Pokemon by name or ID
        </p>
      </div>

      {/* Search Input */}
      <div className="relative" ref={suggestionsRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            className="pl-10 pr-10 h-12 text-lg"
            type="text"
            placeholder="Search for a Pokemon (e.g., Pikachu, 25, Charizard)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(search.length > 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(search);
              }
            }}
          />
          {search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => {
                setSearch("");
                setShowSuggestions(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((pokemon: { name: string }) => (
              <button
                key={pokemon.name}
                className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between"
                onClick={() => handleSuggestionClick(pokemon.name)}
              >
                <span className="capitalize">{pokemon.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && !data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Recent Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {searchHistory.slice(0, 5).map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(item)}
                  className="capitalize"
                >
                  {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => handleSearch(search)}
          disabled={!search.trim() || isLoading}
          className="px-8 h-12 text-lg"
        >
          {isLoading ? "Searching..." : "Search Pokemon"}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Searching for Pokemon...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <p className="font-semibold">Pokemon not found!</p>
              <p className="text-sm mt-1">{error?.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pokemon Card */}
      {data && (
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(data.id)}
                className="h-8 w-8 p-0"
              >
                <Star
                  className={`h-4 w-4 ${
                    favorites.includes(data.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>

            {/* Pokemon Image */}
            <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt={data.name + " is not available"}
                  width={200}
                  height={200}
                  className="object-contain"
                
                />
              ) : (
                <div className="text-muted-foreground">No image available</div>
              )}
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold capitalize">{data.name}</h2>
              <span className="text-lg text-muted-foreground">#{data.id}</span>
            </div>

            {/* Types */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.types.map((type) => (
                  <Badge
                    key={type}
                    className={`px-3 py-1 text-sm font-medium ${
                      TYPE_TO_BADGE_CLASS[type] || "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Height
                </h3>
                <p className="text-lg font-semibold">{data.height}m</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Weight
                </h3>
                <p className="text-lg font-semibold">{data.weight}kg</p>
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.abilities.map((ability) => (
                  <Badge
                    key={ability}
                    variant="secondary"
                    className="capitalize"
                  >
                    {ability}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
