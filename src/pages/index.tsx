import React from "react";
import PokemonShort from "~/components/pokemonShort";
import SearchBox from "~/components/searchBox";
import { trpc } from "~/utils/trpc";

function HomePage() {
  const {
    data: list,
    refetch,
    isLoading,
  } = trpc.listPokemons.useQuery({ index: 151 });
  return (
    <div className="flex justify-center bg-gradient-to-b from-[#eeecec] to-[#e7e7e7]">
      <main className="flex min-h-screen max-lg: flex-col p-3">
        <div className="max-w-5xl">
          <SearchBox />
          <div className="flex flex-wrap">
            {list! &&
              list.list.map((p) => (
                <PokemonShort
                  key={`${p.id}-${p.name}`}
                  index={p.id}
                  name={p.name}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
