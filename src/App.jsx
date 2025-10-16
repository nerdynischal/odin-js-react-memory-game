import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import DifficultySelector from "./components/DifficultySelector";
import GameStatus from "./components/GameStatus";
import Header from "./components/Header";

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
  const [gameStatus, setGameStatus] = useState("playing");
  const [difficulty, setDifficulty] = useState("medium"); // default
  const [shake, setShake] = useState(false);
  const [flip, setFlip] = useState(false);

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
      setFlip((prev) => !prev); // toggle instead of timeout
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
      setShake(true);
      // Wait for the shake animation to finish before showing Game Over
      setTimeout(() => {
        setShake(false);
        setGameStatus("lost");
      }, 500); // matches animation duration
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
        setFlip((prev) => !prev); // toggle instead of timeout
      }
    }
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setClicked([]);
    setGameStatus("playing");
    setCards(shuffleArray(cards));
    setFlip((prev) => !prev); // toggle instead of timeout
  };

  return (
    <>
      <Header />
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <Scoreboard score={score} bestScore={bestScore} />

      {gameStatus !== "playing" ? (
        <GameStatus status={gameStatus} onRestart={restartGame} />
      ) : (
        <CardGrid
          cards={cards}
          onCardClick={handleCardClick}
          shake={shake}
          flip={flip}
        />
      )}
    </>
  );
}

export default App;
