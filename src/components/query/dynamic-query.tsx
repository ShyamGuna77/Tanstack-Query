"use client";
import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchRepos, fetchIssues } from "@/lib/api";

const DynamicQuery = () => {
  type Repo = {
    id: number;
    name: string;
    full_name: string;
  };

  function useRepos() {
    return useQuery({
      queryKey: ["repos"],
      queryFn: fetchRepos,
    });
  }

  function useIssues(repos: Repo[]) {
    return useQueries({
      queries: repos.map((repo: Repo) => ({
        queryKey: ["issues", repo.name],
        queryFn: () => fetchIssues(repo.name),
      })),
    });
  }

  const repos = useRepos();
  const issues = useIssues(repos?.data || []);

  if (repos.isPending) {
    return <div>Loading repositories...</div>;
  }

  if (repos.isError) {
    return <div>Error loading repositories: {repos.error?.message}</div>;
  }

  if (!repos.data) {
    return <div>No repositories found</div>;
  }

  return (
    <>
      <div>
        <h1>Cal.com Dashboard</h1>
        <h2>Repos ({repos.data.length})</h2>

        <ul>
          {repos.data.map((repo: Repo, index: number) => {
         
            const repoIssues = issues[index];

            const count = repoIssues?.data?.length ?? 0;

            return (
              <li key={repo.id}>
                <strong>{repo.name}</strong>
                {" – "}
                {repoIssues?.isPending && "Loading issues..."}
                {repoIssues?.isError && "Error loading issues"}
                {repoIssues?.isSuccess && `${count} issues`}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DynamicQuery;
