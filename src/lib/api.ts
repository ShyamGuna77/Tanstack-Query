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
