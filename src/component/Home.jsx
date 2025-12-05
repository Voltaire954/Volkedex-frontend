import { useEffect, useState } from "react";
import typeGradients from "../styles/typeGradients";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      );
      const data = await res.json();
      setImage(data.sprites.front_default);
      setType(data.types[0].type.name);
    }
    fetchImage();
  }, [pokemon.id]);

  return (
    <li
      className="pcard"
      style={{
        background: type ? typeGradients[type] : "#333",
        padding: "20px",
        borderRadius: "12px",
        listStyle: "none",
        color: "white",
        boxShadow: "5px 5px 5px rgba(0,0,0,0.3)",
        transition: "transform 0.2s",
      }}
    >
      <h3 className="pname">{pokemon.name}</h3>
      {image ? <img src={image} alt={pokemon.name} /> : "Loading image..."}
    </li>
  );
}

export default function Home({ pokemon }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 30; // 3 per row × 10 rows

  // 1️⃣ FILTER POKÉMON BASED ON SEARCH
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2️⃣ PAGINATION ON FILTERED RESULTS
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentPokemon = filteredPokemon.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div>
      <h1 className="plist">Volkedex</h1>

      {/* 🔍 Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px", }}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page on new search
          }}
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #ccc",
          }}
        />
      </div>

      {/* GRID of Pokémon */}
      <ul className="pcards">
        {currentPokemon.map((p) => (
          <Link
            key={p.id}
            to={`/pokemon/${p.id}`}
            style={{ textDecoration: "none" }}
          >
            <PokemonCard pokemon={p} />
          </Link>
        ))}
      </ul>

      {/* Pagination Controls */}
      {filteredPokemon.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
