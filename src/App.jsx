import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";
import "./App.css";

//We’ll use Fisher-Yates shuffle:
function shuffleArray(array) {
  return [...array]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  //const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [difficulty, setDifficulty] = useState("medium"); // default

  // Fetch Pokémon
  useEffect(() => {
    const fetchPokemon = async () => {
      let limit = 12; // medium default
      if (difficulty === "easy") limit = 6;
      if (difficulty === "hard") limit = 20;

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await res.json();

      const pokemon = data.results.map((poke, index) => ({
        id: index + 1,
        name: poke.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));

      setCards(pokemon);
    };

    fetchPokemon();
  }, [difficulty]); // refetch when difficulty changes

  // Reset game when difficulty changes
  useEffect(() => {
    setScore(0);
    setClicked([]);
    setGameStatus("playing");
  }, [difficulty]);

  // Handle card click
  const handleCardClick = (id) => {
    if (clicked.includes(id)) {
      setGameStatus("lost");
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      const newClicked = [...clicked, id];
      setClicked(newClicked);

      if (newClicked.length === cards.length) {
        setGameStatus("won");
      } else {
        setCards(shuffleArray(cards));
      }
    }
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setClicked([]);
    setGameStatus("playing");
    setCards(shuffleArray(cards));
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setDifficulty("easy")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid gray",
            backgroundColor: difficulty === "easy" ? "lightgreen" : "white",
          }}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty("medium")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid gray",
            backgroundColor: difficulty === "medium" ? "lightgreen" : "white",
          }}
        >
          Medium
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          style={{
            margin: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid gray",
            backgroundColor: difficulty === "hard" ? "lightgreen" : "white",
          }}
        >
          Hard
        </button>
      </div>

      <Scoreboard score={score} bestScore={bestScore} />

      {gameStatus !== "playing" ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {gameStatus === "lost" && <h2>Game Over!</h2>}
          {gameStatus === "won" && <h2>🎉 You Win! 🎉</h2>}
          <button
            onClick={restartGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "tomato",
              color: "white",
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
