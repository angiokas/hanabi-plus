const Card: React.FC<{
  card?: CardData;
  isBack?: boolean;
  className?: string;
}> = ({ card, isBack = false, className = "" }) => {
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    white: "bg-gray-100 border-2 border-gray-300",
  };

  if (isBack) {
    return (
      <div className={`card-back ${className}`}>
        <div className="card-back-pattern"></div>
      </div>
    );
  }

  if (!card) {
    return <div className={`card-empty ${className}`}></div>;
  }

  const bgColor = card.colorShown ? colorClasses[card.color] : "bg-gray-600";
  const textColor = card.color === "white" ? "text-gray-800" : "text-white";

  return (
    <div className={`card ${bgColor} ${textColor} ${className}`}>
      <div className="card-content">
        {card.rankShown && <span className="card-rank">{card.rank}</span>}
        {!card.colorShown && !card.rankShown && (
          <div className="card-unknown">?</div>
        )}
      </div>
    </div>
  );
};

export default Card;
