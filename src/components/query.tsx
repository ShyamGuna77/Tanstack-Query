"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

type PokemonTypeName =
  | "normal" | "fire" | "water" | "electric" | "grass" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "psychic"
  | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy"

type PokemonDetails = {
  id: number
  name: string
  imageUrl: string
  types: PokemonTypeName[]
}

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
}

async function fetchPokemonListWithDetails(limit: number = 50): Promise<PokemonDetails[]> {
  const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  if (!listResponse.ok) {
    throw new Error("Failed to fetch Pokémon list")
  }
  const listJson: { results: Array<{ name: string, url: string }> } = await listResponse.json()

  const detailPromises = listJson.results.map(async (entry) => {
    const detailResponse = await fetch(entry.url)
    if (!detailResponse.ok) {
      throw new Error("Failed to fetch Pokémon details")
    }
    const detailJson = await detailResponse.json()
    const id: number = detailJson.id
    const imageFromOfficial: string | null = detailJson?.sprites?.other?.["official-artwork"]?.front_default || null
    const fallbackSprite: string | null = detailJson?.sprites?.front_default || null
    const imageUrl: string = imageFromOfficial || fallbackSprite || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    type DetailTypeEntry = { slot: number; type: { name: PokemonTypeName; url: string } }
    const types: PokemonTypeName[] = (detailJson.types as DetailTypeEntry[] | undefined)?.map((t) => t.type.name) || []
    return {
      id,
      name: detailJson.name as string,
      imageUrl,
      types,
    } as PokemonDetails
  })

  const detailed = await Promise.all(detailPromises)
  return detailed
}

const Data = () => {
  const { data, isLoading, isError } = useQuery<PokemonDetails[]>({
    queryKey: ["pokemon", "detailed", 50],
    queryFn: () => fetchPokemonListWithDetails(50),

  })

  if (isLoading) return <div className='p-6 text-center'>Loading...</div>
  if (isError || !data) return <div className='p-6 text-center'>Something went wrong.</div>

  return (
    <div className='px-6 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.map((pokemon) => {
          const primaryType = pokemon.types[0] as PokemonTypeName | undefined
          const badgeClass = primaryType ? TYPE_TO_BADGE_CLASS[primaryType] : "bg-gray-200 text-gray-900"
          return (
            <div
              key={pokemon.id}
              className='rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
            >
              <div className='relative w-full aspect-[4/3] bg-secondary flex items-center justify-center'>
                {pokemon.imageUrl ? (
                  <Image
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    width={256}
                    height={256}
                    className='object-contain w-full h-full'
                  />
                ) : (
                  <div className='text-muted-foreground'>No image</div>
                )}
              </div>
              <div className='p-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold capitalize'>{pokemon.name}</h3>
                  <span className='text-sm text-muted-foreground'>#{pokemon.id}</span>
                </div>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {pokemon.types.map((typeName) => (
                    <span
                      key={typeName}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${TYPE_TO_BADGE_CLASS[typeName] || "bg-gray-200 text-gray-900"}`}
                    >
                      {typeName}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`h-1 ${badgeClass}`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Data