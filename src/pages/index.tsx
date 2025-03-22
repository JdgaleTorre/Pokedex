import Image from "next/image";
import React, { useEffect, useState } from "react";
import PokemonDetail from "~/components/pokemonDetails";
import PokemonShort from "~/components/pokemonShort";
import SearchBox from "~/components/searchBox";
import { trpc } from "~/utils/trpc";
import { motion as m } from "framer-motion";

type list = { id: number; name: string; sprite: string; }


function HomePage() {
  const [pokemonSelected, setPokemonSelected] = useState(0);
  const { data: list, isLoading } = trpc.listPokemons.useQuery({ index: 151 });
  const [pokemonVisible, setPokemonVisible] = useState(list || undefined);

  useEffect(() => {
    setPokemonVisible(list)
  }, [list])

  const onFilterPokemons = (name: string) => {
    if (name === '') {
      setPokemonVisible(list); // Show all Pokémon if the input is empty
    } else {
      if (list) {
        const allPokemons = list.list;
        const filtered = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()))

        setPokemonVisible({ list: filtered })
      }
    }
  };

  return (
    <>
      <div className="justify-center bg-gradient-to-b from-[#f7f8fc] to-[#f7f8fc]">
        {isLoading && (
          <div className="flex min-h-screen h-full justify-center items-center">
            <div className="animate-spin">
              <Image
                src="/pokeball-icon.png"
                height={96}
                width={96}
                alt="pokeball"
                priority
              />
            </div>
          </div>
        )}
        {!isLoading && (
          <>
            <m.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
              className="flex min-h-screen max-lg: flex-row p-3"
            >
              <div className="w-full xl:mr-[28rem] xl:ml-36">
                <SearchBox onChange={onFilterPokemons} />
                <div className="w-full flex flex-wrap mt-6">
                  {pokemonVisible! &&
                    pokemonVisible.list.map((p) => (
                      <div
                        onClick={() => setPokemonSelected(p.id)}
                        key={`${p.id}-${p.name}`}
                        className="flex grow-[0.5] min-w-[50%] md:min-w-[33%] lg:min-w-[25%]"
                      >
                        <PokemonShort
                          index={p.id}
                          name={p.name}
                          sprite={p.sprite}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </m.main>
            <m.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.75 }}
              className={`bottom-0 right-0 h-4/5 w-full xl:w-96 xl:mr-12 fixed ${pokemonSelected === 0 ? "max-lg:hidden" : ""}`}
            >
              <div className="flex h-full w-full justify-center items-center relative">
                {pokemonSelected === 0 && (
                  <div className="h-full w-full justify-center items-center relative bg-white rounded-t-2xl shadow-lg hidden lg:flex">
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
                )}
                {pokemonSelected !== 0 && (
                  <PokemonDetail
                    pokemonSelected={pokemonSelected}
                    onClose={() => setPokemonSelected(0)}
                  />
                )}
              </div>
            </m.div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
