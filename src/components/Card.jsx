function Card({ card, onClick }) {
  return (
    <div
      className="card"
      onClick={() => onClick(card.id)}
      style={{
        border: "1px solid black",
        padding: "20px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      {card.name}
    </div>
  );
}

export default Card;
