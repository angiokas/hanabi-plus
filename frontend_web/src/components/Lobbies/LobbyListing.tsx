import { Users, Crown, Eye, Play } from "lucide-react";
import type { LobbyListingProps } from "@/types";

const LobbyListing: React.FC<LobbyListingProps> = ({
  lobby,
  onJoin,
  onSpectate,
}) => {
  const canJoin =
    lobby.users.length < lobby.maxPlayers && lobby.status === "waiting";

  return (
    <div className="lobby-listing">
      <div className="lobby-header">
        <div className="lobby-info">
          <h3 className="lobby-name">{lobby.name}</h3>
          <div className="lobby-meta">
            <span className="lobby-gamemode">{lobby.gameMode}</span>
            <span className="lobby-privacy">
              {lobby.isPrivate ? "🔒 Private" : "🌐 Public"}
            </span>
          </div>
        </div>
        <div className="lobby-status">
          <span
            className={`status-badge ${lobby.status === "waiting" ? "status-waiting" : "status-ingame"}`}
          >
            {lobby.status === "waiting" ? "Waiting" : "In Game"}
          </span>
        </div>
      </div>

      <div className="lobby-details">
        <div className="lobby-players">
          <Users className="lobby-icon" />
          <span>
            {lobby.users.length}/{lobby.maxPlayers} Players
          </span>
        </div>
        <div className="lobby-owner">
          <Crown className="lobby-icon" />
          <span>Host: {lobby.owner.name}</span>
        </div>
      </div>

      <div className="lobby-actions">
        <button
          className={`lobby-button lobby-join ${!canJoin ? "lobby-button-disabled" : ""}`}
          onClick={() => onJoin(lobby.id)}
          disabled={!canJoin}
        >
          <Play className="button-icon" />
          Join Game
        </button>
        <button
          className="lobby-button lobby-spectate"
          onClick={() => onSpectate(lobby.id)}
        >
          <Eye className="button-icon" />
          Spectate
        </button>
      </div>
    </div>
  );
};

export default LobbyListing;
