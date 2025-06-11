import Card from "./Card";
import type { PlayerData } from "../types";
const PlayerHand: React.FC<{
  player: PlayerData;
  className?: string;
}> = ({ player, className = "" }) => {
  return (
    <div className={`player-hand ${className}`}>
      <div className="player-name">{player.name}</div>
      <div className="hand-cards">
        {player.hand.map((card) => (
          <Card
            key={card.id}
            card={card}
            isBack={player.isCurrentPlayer}
            className="hand-card"
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
