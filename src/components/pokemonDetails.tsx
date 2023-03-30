import Image from "next/image";
import getShorterStat from "~/utils/getShorterStat";
import { trpc } from "~/utils/trpc";
import PokemonType from "./pokemonType";
import { motion as m } from "framer-motion";

export default function PokemonDetail({
  pokemonSelected,
}: {
  pokemonSelected: number;
}) {
  const {
    data: pokemon,
    refetch,
    isLoading,
  } = trpc.getPokemonBy.useQuery({ index: pokemonSelected });

  return (
    <>
      {isLoading && (
        <div className="animate-spin m-auto">
          <Image
            src="/pokeball-icon.png"
            height={96}
            width={96}
            alt="pokeball"
          />
        </div>
      )}
      {!isLoading && pokemon && (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.75 }}
          className="flex h-full justify-center items-start relative  bg-white rounded-t-2xl shadow-lg "
        >
          <div className="flex flex-col justify-center items-center">
            {pokemon && (
              <Image
                src={
                  pokemon?.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default
                    ? pokemon?.sprites.versions["generation-v"]["black-white"]
                        .animated.front_default
                    : "/no-pokemon-selected.png"
                }
                height={192}
                width={192}
                alt="pokemon sprites"
                className="pixelated -mt-24"
              />
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
      )}
    </>
  );
}
