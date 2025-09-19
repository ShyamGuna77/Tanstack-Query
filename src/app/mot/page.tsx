
import React from "react";
import FakeStoreDashboard from '@/components/query/dynamic-query'
import PokemonPage from '@/components/query/pokepagination'
import PokemonInfinite from '@/components/query/infiniteQuery'
export default function MotionAnimate() {
  return (
    <div>
      {/* <ImageAnimate /> */}
      {/* <DynamicQuery /> */}
      {/* <FakeStoreDashboard /> */}
      <PokemonInfinite />
    </div>
  )
}
