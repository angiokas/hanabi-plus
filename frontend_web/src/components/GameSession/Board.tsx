import Stack from "./Stack";
import type { CardData } from "../../types";

const Board: React.FC<{
  stacks: {
    color: "red" | "blue" | "green" | "yellow" | "white";
    topCard?: CardData;
  }[];
  className?: string;
}> = ({ stacks, className = "" }) => {
  return (
    <div className={`board ${className}`}>
      <div className="board-title">Play Area</div>
      <div className="stacks-container">
        {stacks.map((stack) => (
          <Stack
            key={stack.color}
            color={stack.color}
            topCard={stack.topCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
