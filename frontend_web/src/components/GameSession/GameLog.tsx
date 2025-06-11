import type { GameLogEntry } from "../../types";
import { Eye, EyeOff } from "lucide-react";
const GameLog: React.FC<{
  entries: GameLogEntry[];
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ entries, isVisible, onToggle, className = "" }) => {
  return (
    <div
      className={`game-log ${isVisible ? "log-visible" : "log-hidden"} ${className}`}
    >
      <div className="log-header">
        <h3 className="log-title">Game Log</h3>
        <button className="log-toggle" onClick={onToggle}>
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {isVisible && (
        <div className="log-content">
          {entries.map((entry) => (
            <div key={entry.id} className="log-entry">
              <div className="log-timestamp">{entry.timestamp}</div>
              <div className="log-action">
                <span className="log-player">{entry.player}</span>
                <span className="log-text">{entry.action}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameLog;
