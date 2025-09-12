import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "pokeapi.co" },
      { protocol: "https", hostname: "img.pokemondb.net" },
      { protocol: "https", hostname: "assets.pokemon.com" },
    ],
  },
};

export default nextConfig;
