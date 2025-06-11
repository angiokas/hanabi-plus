import Card from "./Card";
import type { CardData } from "../../types";

const Stack: React.FC<{
  color: "red" | "blue" | "green" | "yellow" | "white";
  topCard?: CardData;
  className?: string;
}> = ({ color, topCard, className = "" }) => {
  const colorClasses = {
    red: "border-red-500 bg-red-50",
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    yellow: "border-yellow-400 bg-yellow-50",
    white: "border-gray-400 bg-gray-50",
  };

  return (
    <div className={`stack ${colorClasses[color]} ${className}`}>
      {topCard ? (
        <Card card={topCard} />
      ) : (
        <div className="stack-empty">
          <div
            className={`stack-color-indicator bg-${color === "white" ? "gray" : color}-500`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Stack;
