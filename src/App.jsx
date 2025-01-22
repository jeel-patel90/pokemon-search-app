import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        const results = response.data.results;

        const detailedData = await Promise.all(
          results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
            };
          })
        );

        setPokemonList(detailedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center mb-5">Pokédex</h1>
      <SearchBar search={search} handleSearch={handleSearch} />

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;