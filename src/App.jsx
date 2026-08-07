import { useEffect, useState } from "react";
import Card from "./components/Card";
import { Pokedex } from "https://cdn.jsdelivr.net/gh/pokeapi/pokeapi-js-wrapper@2.0.2/src/index.js";

const pokedex = await Pokedex.init({ cacheImages: true });

async function fetchPokemonList() {
  const list = await pokedex.getPokemonsList({ limit: 100, offset: 0 });
  return list;
}

async function fetchPokemonData(name) {
  const res = await pokedex.getPokemonByName(name);
  return res;
}

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function loadPokemon() {
      const pokemonList = await fetchPokemonList();
      const allData = await Promise.all(
        pokemonList.results.map((pokemon) => fetchPokemonData(pokemon.name)),
      );
      setPokemonData(allData);
    }
    loadPokemon();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemonData.map((data) => (
        <div className="flex justify-center p-5" key={data.id}>
          <Card
            id={data.id}
            name={data.name}
            image={data.sprites.other["official-artwork"].front_default}
          />
        </div>
      ))}
    </div>
  );
}
