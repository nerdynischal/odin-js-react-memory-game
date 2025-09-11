import "./../styles/DifficultySelector.css";

function DifficultySelector({ difficulty, setDifficulty }) {
  const levels = ["easy", "medium", "hard"];

  return (
    <div className="difficulty-selector">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(level)}
          className={`difficulty-btn ${difficulty === level ? "active" : ""}`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default DifficultySelector;
