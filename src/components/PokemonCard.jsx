import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl text-center capitalize mt-2">{pokemon.name}</h2>
    </div>
  );
};

export default PokemonCard;