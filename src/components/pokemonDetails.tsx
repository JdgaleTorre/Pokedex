import Image from "next/image";
import { trpc } from "~/utils/trpc";
import PokemonType from "./pokemonType";

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
    <div className="flex h-full justify-center items-start relative">
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
          <div>
            {pokemon.types.map((t) => (
              <PokemonType type={t.type.name} />
            ))}
          </div>
          <div>Pokedex Entry</div>
          <div>
            {pokemon.flavor_text_entries[0].flavor_text.replace("", " ")}
          </div>
          <div>
            <div>
              <div>Height</div>
              <div>{`${pokemon.height / 10}m`}</div>
            </div>
            <div>
              <div>Weight</div>
              <div>{`${pokemon.weight / 10}kg`}</div>
            </div>
          </div>
          <div>
            <div>Abilities</div>
            <div>
              {pokemon.abilities.map((x) => (
                <div>{x.ability.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
