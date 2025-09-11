function Card({ card, onClick }) {
  return (
    <div
      className="card"
      onClick={() => onClick(card.id)}
      style={{
        border: "1px solid black",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}

export default Card;
