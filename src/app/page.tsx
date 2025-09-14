"use client";

import Pokemon from "@/components/poke";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

export default function Home() {
  const [id, setId] = useState<number>(1);

  const handlePrevious = () => {
    if (id > 1) {
      setId(id - 1);
    }
  };

  const handleNext = () => {
    setId(id + 1);
  };

  const handleRandom = () => {
    setId(Math.floor(Math.random() * 1000) + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-50">
      <div className="container mx-auto px-4 py-8">
      
        <Pokemon id={id} />

      
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={handlePrevious}
            disabled={id <= 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm font-medium">ID: {id}</span>
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleRandom}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Random
          </Button>
        </div>

        {/* Additional Components (commented out) */}
        {/* <Data /> */}
        {/* <PokemonSearch /> */}
        {/* <RefetchIntervel /> */}
      </div>
    </div>
  );
}
