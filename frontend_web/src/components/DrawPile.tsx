import Card from "./Card";
const DrawPile: React.FC<{
  count: number;
  className?: string;
}> = ({ count, className = "" }) => {
  return (
    <div className={`draw-pile ${className}`}>
      <div className="pile-label">Draw Pile</div>
      <div className="pile-container">
        <Card isBack={true} />
        <div className="pile-count">{count}</div>
      </div>
    </div>
  );
};

export default DrawPile;
