"use client"

import Data from "@/components/query";
import Pokemon from "@/components/poke";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PokemonSearch from "@/components/pokemon-search";
export default function Home() {
  const [id,setId] = useState<number>(1)
  return (
    <div>
      {/* <Data /> */}
      {/* <PokemonSearch /> */}

      <Pokemon id={id} />
      <div className="flex items-center justify-center gap-4 -mt-48">
        <Button className="mt-4" onClick={() => setId(id-1)}>
          Load previous
        </Button>
        <Button className="mt-4" onClick={() => setId(id+1)}>
          Load next
        </Button>
        <Button className="mt-4" variant={"destructive"} onClick={() => setId(Math.floor(Math.random() * 1000) + 1)}>
          Load random
        </Button>
      </div>
    </div>
  );
}
