import React, { useEffect, useState } from "react";


export default function Game() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState("");

  // Random Pokémon ID (Gen 1)
  function getRandomPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
  }

  // Fetch random Pokémon on load
  useEffect(() => {
    fetchNewPokemon();
  }, []);

  async function fetchNewPokemon() {
    const id = getRandomPokemonId();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    setPokemon({
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
    });
  }

  function handleGuess() {
    if (!pokemon) return;

    const correct = guess.trim().toLowerCase() === pokemon.name.toLowerCase();
    setResult(correct ? "Correct!" : `Wrong! It was ${pokemon.name}`);
    setRevealed(true);
  }

  function resetGame() {
    setGuess("");
    setRevealed(false);
    setResult("");
    fetchNewPokemon();
  }

  if (!pokemon) return <h1 className="loading">Loading game...</h1>;

  return (
    <div className="game-container">
      <h1 className="game-title">Who's That Pokémon?</h1>

      {/* Pokémon Image */}
      <img
        src={pokemon.sprite}
        alt="mystery pokemon"
        className={`pokemon-img ${revealed ? "revealed" : "hidden"}`}
      />

      {/* Guess input */}
      {!revealed && (
        <div className="guess-section">
          <input
            className="guess-input"
            placeholder="Enter Pokémon name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          <button className="guess-btn" onClick={handleGuess}>
            Guess
          </button>
        </div>
      )}

      {/* Result */}
      {revealed && (
        <div className="result-section">
          <h2 className="result-text">{result}</h2>
          <button className="play-again-btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
