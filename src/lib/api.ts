
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number; };
};


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
