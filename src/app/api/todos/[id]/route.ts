import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "db.json");

// Read data from db.json
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading/parsing db.json:", error);
    return { todos: [] };
  }
}

// Write data to db.json
async function writeDB(data: {
  todos: Array<{
    id: string | number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
  }>;
}) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(DB_PATH, jsonString, "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
    throw error;
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("PUT request for todo ID:", id);
    const body = await request.json();
    const { title, description, completed } = body;

    const data = await readDB();
    console.log("All todos:", data.todos);
    const todoIndex = data.todos.findIndex(
      (todo: { id: string | number }) => String(todo.id) === String(id)
    );
    console.log("Found todo at index:", todoIndex);

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Update todo
    const updatedTodo = {
      ...data.todos[todoIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && {
        description: description?.trim() || "",
      }),
      ...(completed !== undefined && { completed }),
      updatedAt: new Date().toISOString(),
    };

    data.todos[todoIndex] = updatedTodo;
    await writeDB(data);

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("DELETE request for todo ID:", id);
    const data = await readDB();
    console.log("All todos:", data.todos);

    const initialLength = data.todos.length;
    data.todos = data.todos.filter(
      (todo: { id: string | number }) => String(todo.id) !== String(id)
    );
    console.log("Todos after filtering:", data.todos);

    if (data.todos.length === initialLength) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await writeDB(data);
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
