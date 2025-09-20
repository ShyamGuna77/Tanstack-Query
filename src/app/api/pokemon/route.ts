import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const pokemons = JSON.parse(data);
    return NextResponse.json(pokemons);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json(
      { error: "Failed to read pokemon data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.power) {
      return NextResponse.json(
        { error: "Name and power are required" },
        { status: 400 }
      );
    }

    // Read existing data
    let pokemons = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      pokemons = JSON.parse(data);
    } catch {
      // If file doesn't exist or is empty, start with empty array
      console.log("Creating new db.json file");
      pokemons = [];
    }

    // Create new pokemon
    const newPokemon = {
      id: pokemons.length + 1,
      name: body.name.trim(),
      power: body.power.trim(),
    };

    // Add to array
    pokemons.push(newPokemon);

    // Write back to file
    await fs.writeFile(dbPath, JSON.stringify(pokemons, null, 2));

    return NextResponse.json(newPokemon, { status: 201 });
  } catch (error) {
    console.error("Error adding pokemon:", error);
    return NextResponse.json(
      { error: "Failed to add pokemon" },
      { status: 500 }
    );
  }
}
