import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import PokemonDetail from "~/components/pokemonDetails";
import PokemonShort from "~/components/pokemonShort";
import SearchBox from "~/components/searchBox";
import { trpc } from "~/utils/trpc";
import { motion as m } from "framer-motion";

function HomePage() {
  const {
    data: list,
    refetch,
    isLoading,
  } = trpc.listPokemons.useQuery({ index: 151 });
  const [pokemonSelected, setPokemonSelected] = useState(0);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex justify-center bg-gradient-to-b from-[#f7f8fc] to-[#f7f8fc]">
        {isLoading && (
          <div className="flex min-h-screen h-full justify-center items-center">
            <div className="animate-spin">
              <Image
                src="/pokeball-icon.png"
                height={96}
                width={96}
                alt="pokeball"
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
              <div className="max-w-5xl">
                <SearchBox />
                <div className="flex flex-wrap mt-6 w-full">
                  {list! &&
                    list.list.map((p) => (
                      <div
                        onClick={() => setPokemonSelected(p.id)}
                        key={`${p.id}-${p.name}`}
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
              className="fixed bottom-0 right-0 w-96 h-4/5 mr-12 max-2xl:invisible"
            >
              <div className="flex h-full justify-center items-center relative">
                {pokemonSelected === 0 && (
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
                )}
                {pokemonSelected !== 0 && (
                  <PokemonDetail pokemonSelected={pokemonSelected} />
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
