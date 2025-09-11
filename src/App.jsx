import { useState } from "react";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";
import "./App.css";

function shuffleArray(array) {
  return [...array]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const dummyCards = [
  { id: 1, name: "Card 1" },
  { id: 2, name: "Card 2" },
  { id: 3, name: "Card 3" },
  { id: 4, name: "Card 4" },
];

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(dummyCards);
  const [clicked, setClicked] = useState([]);

  const handleCardClick = (id) => {
    if (clicked.includes(id)) {
      // Reset score
      setScore(0);
      setClicked([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      setClicked([...clicked, id]);
    }

    // Shuffle after each click
    setCards(shuffleArray(cards));
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <div style={{ display: "flex" }}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
