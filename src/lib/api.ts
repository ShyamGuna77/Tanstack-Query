
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number; };
};

// lib/pokeApi.ts

export type PokemonListResponse = {
  results: { name: string; url: string }[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
};

const PAGE_SIZE = 10;

export async function fetchPokemonPage(page: number) {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json() as Promise<PokemonListResponse>;
}

export async function fetchPokemonDetails(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Pokémon details");
  return res.json() as Promise<PokemonDetails>;
}



export async function fetchRepos() {
  const res = await fetch("https://api.github.com/orgs/calcom/repos");
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export async function fetchIssues(repo: string) {
  const res = await fetch(`https://api.github.com/repos/calcom/${repo}/issues`);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}



export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

export async function fetchCategory(category: string) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${category}`);
  return res.json(); 
}
