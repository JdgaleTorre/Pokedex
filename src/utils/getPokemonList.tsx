import { PokemonClient } from "pokenode-ts";

export async function getPokemonList() {
    const api = new PokemonClient();
    const response = await api.listPokemons(0, 151);

    const pokemonList = response.results.map((p, index) => ({
        id: index + 1,
        name: p.name
    }));

    return pokemonList;
}
