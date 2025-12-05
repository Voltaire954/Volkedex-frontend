import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import bgImage from "../assets/pokemon-professor-oak-facts-trivia.jpg";
export default function Pokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        // 1. Fetch your backend data (name, type, etc.)
        const res = await fetch(
          `https://volkedex-backend.onrender.com/pokemon/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch Pokémon");

        const data = await res.json();

        // 2. Fetch sprite from PokeAPI
        const pokeApiRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokeApiData = await pokeApiRes.json();

        // 3. Add sprite to your backend data object
        data.sprite = pokeApiData.sprites.front_default;

        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) return <h1>Loading Pokémon...</h1>;
  if (!pokemon) return <h1>Not found</h1>;

  return (
    <>
      <div className="bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="pokeCard">
        <h1 className="pokeName">{pokemon.name}</h1>

        <img className="pokeImg" src={pokemon.sprite} alt={pokemon.name} />

        {/* <p className="pokeType">Type: {pokemon.type}</p> */}
        {/* <p className="pokeHeight">Height: {pokemon.height}lbs</p> */}
        {/* <p className="pokeWeight">Weight: {pokemon.weight}inchs</p> */}
      </div>
    </>
  );
}
