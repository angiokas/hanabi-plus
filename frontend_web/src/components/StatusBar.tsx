import Token from "./Token";
const StatusBar: React.FC<{
  score: number;
  hintTokens: number;
  fuseTokens: number;
  className?: string;
}> = ({ score, hintTokens, fuseTokens, className = "" }) => {
  return (
    <div className={`status-bar ${className}`}>
      <div className="score-display">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      <Token type="hint" count={hintTokens} maxCount={8} />
      <Token type="fuse" count={fuseTokens} maxCount={3} />
    </div>
  );
};

export default StatusBar;
