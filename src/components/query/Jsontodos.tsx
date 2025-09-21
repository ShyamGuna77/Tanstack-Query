"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
type Todo = {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
};

// Fetch todos
async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// Add todo
async function addTodo(newTodo: Todo): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

export default function Todos() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // Query
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => [
        ...oldTodos,
        newTodo,
      ]);
      setTitle(""); // clear input
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-xl font-bold">Todos</h1>

      <ul className="space-y-1">
        {todos?.map((todo) => (
          <li key={todo.id} className="p-1 border rounded">
            {todo.title}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={() =>
            mutation.mutate({
              userId: 1,
              title,
              completed: false,
            })
          }
          disabled={mutation.isPending || !title.trim()}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {mutation.isPending ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
