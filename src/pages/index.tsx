import React from "react";
import PokemonShort from "~/components/pokemonShort";
import SearchBox from "~/components/searchBox";

function HomePage() {
  return (
    <div className="flex justify-center bg-gradient-to-b from-[#eeecec] to-[#e7e7e7]">
      <main className="flex min-h-screen max-lg: flex-col p-3">
        <div className="w-3/4">
          <SearchBox />
          <div className="flex flex-wrap flex-auto">
            <PokemonShort />
            <PokemonShort />
            <PokemonShort />
            <PokemonShort />
            <PokemonShort />
            <PokemonShort />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
