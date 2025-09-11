import "./../styles/GameStatus.css";

function GameStatus({ status, onRestart }) {
  return (
    <div className="game-status">
      {status === "lost" && <h2>Game Over!</h2>}
      {status === "won" && <h2>🎉 You Win! 🎉</h2>}
      <button className="restart-btn" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}

export default GameStatus;
