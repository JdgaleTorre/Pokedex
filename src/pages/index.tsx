import Image from "next/image";
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
    <div className="flex justify-center bg-gradient-to-b from-[#f7f8fc] to-[#f7f8fc]">
      <main className="flex min-h-screen max-lg: flex-row p-3">
        <div className="max-w-5xl mr-64">
          <SearchBox />
          <div className="flex flex-wrap mt-6">
            {list! &&
              list.list.map((p) => (
                <PokemonShort
                  key={`${p.id}-${p.name}`}
                  index={p.id}
                  name={p.name}
                  sprite={p.sprite}
                />
              ))}
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 right-0 bg-white w-96 h-4/5 mr-12 rounded-t-2xl shadow-lg">
        <div className="flex h-full justify-center items-center relative">
          <div className="absolute -top-28">
            <Image
              src="/no-pokemon-selected.png"
              width={100}
              height={100}
              alt="pokemon no selected"
            />
          </div>
          <span>Select a Pokémon to show the stats</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
