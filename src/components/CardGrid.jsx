// src/components/CardGrid.jsx
import Card from "./Card";
import "./../styles/CardGrid.css";

function CardGrid({ cards, onCardClick, shake, flip }) {
  return (
    <div className={`card-grid ${shake ? "shake" : ""} ${flip ? "flip" : ""}`}>
      {cards.map((card) => (
        <Card key={`${card.id}-${flip}`} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardGrid;
