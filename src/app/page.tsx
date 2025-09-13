"use client"

import Data from "@/components/query";
import Pokemon from "@/components/poke";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [id,setId] = useState(1)
  return (
 <div>
  {/* <Data /> */}


  <Button className="mt-4" onClick={()=>setId(9)}>Click me</Button>
  <Button className="mt-4" onClick={()=>setId(1)}>Load Bulbo</Button>
  <Pokemon id={id} />
 </div>
  );
}
