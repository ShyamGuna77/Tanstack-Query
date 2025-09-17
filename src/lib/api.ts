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



export async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategory(category: string) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${category}`);
  return res.json(); 
}
