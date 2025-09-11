// src/components/CardGrid.jsx
import Card from "./Card";
import "./../styles/CardGrid.css";

function CardGrid({ cards, onCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardGrid;
