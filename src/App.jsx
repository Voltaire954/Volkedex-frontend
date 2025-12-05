import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/Home.css"
import "./styles/Header.css"
import "./styles/Pokemon.css"
import "./styles/Footer.css"
import "./styles/Game.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import Pokemon from "./component/Pokemon";
import Game from "./component/Game";
import Header from "./component/ui/Header";
import Footer from "./component/ui/Footer";

function App() {
  const [pokemon, setPokemon] = useState([]); // store Pokémon list
  const [loading, setLoading] = useState(true);

  async function getAllPokemon() {
    const res = await fetch("https://volkedex-backend.onrender.com/pokemon");
    if (!res.ok) throw new Error("Failed to fetch Pokémon");
    return await res.json(); // ✅ MUST CALL json()

  }

  useEffect(() => {
    getAllPokemon()
      .then((data) => setPokemon(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading Pokémon...</h1>;

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="home">
              <Home pokemon={pokemon} />
            </div>
          }
        />

        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
