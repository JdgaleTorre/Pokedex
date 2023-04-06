import Image from "next/image";
import getShorterStat from "~/utils/getShorterStat";
import { trpc } from "~/utils/trpc";
import PokemonType from "./pokemonType";
import { motion as m } from "framer-motion";

export default function PokemonDetail({
  pokemonSelected,
  onClose,
}: {
  pokemonSelected: number;
  onClose: Function;
}) {
  const {
    data: pokemon,
    refetch,
    isLoading,
  } = trpc.getPokemonBy.useQuery({ index: pokemonSelected });

  return (
    <>
      {isLoading && (
        <div className="m-auto p-20 bg-white rounded-lg shadow-lg hidden xl:flex">
          <Image
            src="/pokeball-icon.png"
            height={96}
            width={96}
            alt="pokeball"
            className="animate-spin"
          />
        </div>
      )}
      {!isLoading && pokemon && (
        <>
          <m.div
            className={`w-full bg-${pokemon.types[0].type.name} absolute h-2/4 -top-44 block xl:hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          >
            <div
              className="absolute right-10 top-10 bg-white flex justify-center items-center rounded-lg p-4 shadow-lg hover:cursor-pointer"
              onClick={() => onClose()}
            >
              <Image
                src="/times.png"
                alt="close button"
                height={24}
                width={24}
              />
            </div>
          </m.div>
          <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5 }}
            className="flex h-full w-full justify-center items-start relative bg-white rounded-t-2xl shadow-lg text-sm md:text-base"
          >
            <div className="flex flex-col justify-center items-center">
              {pokemon && (
                <div className="w-36 h-36 lg:w-44 lg:h-44 relative -mt-24">
                  <Image
                    src={
                      pokemon?.sprites.versions["generation-v"]["black-white"]
                        .animated.front_default
                        ? pokemon?.sprites.versions["generation-v"][
                            "black-white"
                          ].animated.front_default
                        : "/no-pokemon-selected.png"
                    }
                    alt="pokemon sprites"
                    className="pixelated "
                    fill
                  />
                </div>
              )}

              <div className="font-bold text-gray-400 mt-2 text-xs">{`No. ${pokemon?.id}`}</div>
              <div className="font-bold text-2xl mt-2 capitalize">
                {pokemon.name}
              </div>
              <div className="flex">
                {pokemon.types.map((t) => (
                  <PokemonType type={t.type.name} key={`type-${t.type.name}`} />
                ))}
              </div>
              <div className="font-bold text-xl mt-2 capitalize my-1">
                Pokedex Entry
              </div>
              <div className="w-4/5 text-center text-[#8F9396] font-bold my-2">
                {pokemon.flavor_text_entries[
                  pokemon.flavor_text_entries.findIndex(
                    (x) => x.language.name === "en"
                  )
                ].flavor_text.replace("", " ")}
              </div>
              <div className="flex w-4/5 justify-evenly mb-2">
                <div className="w-4/5 justify-center text-center">
                  <div className="font-bold text-xl mt-2 capitalize my-1">
                    Height
                  </div>
                  <div
                    className={`bg-[#f7f8fc] capitalize rounded-lg py-1 px-2 mx-2 font-bold`}
                  >{`${pokemon.height / 10}m`}</div>
                </div>
                <div className="w-4/5 justify-center text-center">
                  <div className="font-bold text-xl mt-2 capitalize my-1">
                    Weight
                  </div>
                  <div
                    className={`bg-[#f7f8fc] capitalize rounded-lg py-1 px-2 mx-2 font-bold`}
                  >{`${pokemon.weight / 10}kg`}</div>
                </div>
              </div>
              <div className="w-4/5">
                <div className="font-bold text-xl mt-2 capitalize my-1 text-center">
                  Abilities
                </div>
                <div className="flex justify-center flex-wrap">
                  {pokemon.abilities.map((x) => (
                    <div
                      className="bg-[#f7f8fc] capitalize rounded-lg py-1 px-2 mx-2 font-bold w-2/5 text-center my-2"
                      key={`ability-${x.ability.name}`}
                    >
                      {x.ability.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-4/5">
                <div className="font-bold text-xl mt-2 capitalize my-1 text-center">
                  Stats
                </div>
                <div className="flex justify-center">
                  {pokemon.stats.map((x) => (
                    <div
                      className="bg-[#f7f8fc] capitalize rounded-lg py-1 px-2 mx-2 font-bold w-2/4 text-center flex flex-col"
                      key={`stat-${x.stat.name}`}
                    >
                      <div className="text-sm font-extrabold">
                        {getShorterStat(x.stat.name)}
                      </div>
                      <div>{x.base_stat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </>
  );
}
