import { PokemonClient } from "pokenode-ts";
import { z } from "zod";
import { procedure, router } from "../trcp";

export const appRouter = router({
  listPokemons: procedure
    .input(
      z.object({
        index: z.number(),
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const response = await api.listPokemons(0, input.index);

      const pokemonList = response.results.map((p, index) => ({
        id: index + 1,
        name: p.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));

      return { list: pokemonList };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
