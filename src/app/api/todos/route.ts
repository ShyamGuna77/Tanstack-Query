import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "db.json");

// Initialize db.json if it doesn't exist
async function initializeDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    // File doesn't exist, create it with initial structure
    const initialData = { todos: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

// Read data from db.json
async function readDB() {
  await initializeDB();
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    console.log("Raw file content:", data);
    const parsed = JSON.parse(data);
    console.log("Parsed data:", parsed);
    return parsed;
  } catch (error) {
    console.error("Error reading/parsing db.json:", error);
    console.error("File path:", DB_PATH);
    // Return default structure if parsing fails
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
    console.log("Writing to db.json:", jsonString);
    await fs.writeFile(DB_PATH, jsonString, "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
    throw error;
  }
}

// GET /api/todos - Get all todos
export async function GET() {
  try {
    console.log("GET /api/todos called");
    const data = await readDB();
    console.log("Returning todos:", data.todos);
    return NextResponse.json(data.todos);
  } catch (error) {
    console.error("Error in GET /api/todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST /api/todos - Add a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // Validate input
    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Read current data
    const data = await readDB();

    // Create new todo
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Add to todos array
    data.todos.push(newTodo);

    // Write back to file
    await writeDB(data);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
