import Card from "./Card";
import type { CardData } from "../types";
import { Trash2 } from "lucide-react";
const DiscardPile: React.FC<{
  cards: CardData[];
  className?: string;
}> = ({ cards, className = "" }) => {
  const topCard = cards[cards.length - 1];

  return (
    <div className={`discard-pile ${className}`}>
      <div className="pile-label">Discard Pile</div>
      <div className="pile-container">
        {topCard ? (
          <Card card={topCard} />
        ) : (
          <div className="pile-empty">
            <Trash2 className="pile-icon" />
          </div>
        )}
        <div className="pile-count">{cards.length}</div>
      </div>
    </div>
  );
};

export default DiscardPile;
