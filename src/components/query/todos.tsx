// components/TodoList.jsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Todo = {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

// API functions
async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("/api/todos");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch todos");
  }
  return response.json();
}

async function addTodo(todo: {
  title: string;
  description: string;
}): Promise<Todo> {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add todo");
  }
  return response.json();
}

async function updateTodo(
  id: string | number,
  updates: Partial<Todo>
): Promise<Todo> {
  const response = await fetch(`/api/todos/${String(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update todo");
  }
  return response.json();
}

async function deleteTodo(id: string | number): Promise<void> {
  const response = await fetch(`/api/todos/${String(id)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete todo");
  }
}

const TodoList = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  // Query todos
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Add todo mutation
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo({ title: "", description: "" });
    },
  });

  // Update todo mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string | number;
      updates: Partial<Todo>;
    }) => updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Add new todo
  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    addMutation.mutate(newTodo);
  };

  // Toggle todo completion
  const handleToggleTodo = (id: string | number, completed: boolean) => {
    updateMutation.mutate({ id, updates: { completed: !completed } });
  };

  // Delete todo
  const handleDeleteTodo = (id: string | number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="mb-6 space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Todo title..."
                value={newTodo.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewTodo((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Description (optional)..."
                value={newTodo.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setNewTodo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={addMutation.isPending || !newTodo.title.trim()}
              className="w-full"
            >
              {addMutation.isPending ? "Adding..." : "Add Todo"}
            </Button>
          </form>

          {/* Error Messages */}
          {addMutation.isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {(addMutation.error as Error)?.message}
            </div>
          )}

          {updateMutation.isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {(updateMutation.error as Error)?.message}
            </div>
          )}

          {deleteMutation.isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {(deleteMutation.error as Error)?.message}
            </div>
          )}

          {isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {(error as Error)?.message}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading todos...</p>
            </div>
          )}

          {/* Todos List */}
          <div className="space-y-3">
            {todos.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                No todos yet. Add one above!
              </div>
            )}

            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 border rounded-lg transition duration-200 hover:shadow-sm ${
                  todo.completed
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id, todo.completed)}
                      disabled={updateMutation.isPending}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p
                          className={`mt-1 text-sm ${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                        {todo.updatedAt && (
                          <span className="ml-2">
                            • Updated:{" "}
                            {new Date(todo.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteTodo(todo.id)}
                    disabled={deleteMutation.isPending}
                    variant="outline"
                    size="sm"
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    {deleteMutation.isPending ? "..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
