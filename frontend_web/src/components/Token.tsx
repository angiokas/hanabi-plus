const Token: React.FC<{
  type: "hint" | "fuse";
  count: number;
  maxCount: number;
  className?: string;
}> = ({ type, count, maxCount, className = "" }) => {
  const tokenColor = type === "hint" ? "bg-blue-500" : "bg-red-500";

  return (
    <div className={`token-container ${className}`}>
      <div className="token-label">
        {type === "hint" ? "Hint Tokens" : "Fuse Tokens"}
      </div>
      <div className="token-display">
        {Array.from({ length: maxCount }, (_, i) => (
          <div
            key={i}
            className={`token ${i < count ? tokenColor : "bg-gray-300"}`}
          />
        ))}
      </div>
      <div className="token-count">
        {count}/{maxCount}
      </div>
    </div>
  );
};

export default Token;
