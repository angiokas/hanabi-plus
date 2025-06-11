import type { Lobby } from "@/types";
import { useState } from "react";
import {
  Users,
  MessageCircle,
  Crown,
  Play,
  X,
  Check,
  Clock,
  Palette,
  Hash,
  Timer,
  Sparkles,
} from "lucide-react";

interface LobbyDetailProps {
  lobby: Lobby;
  currentUserId: string;
  onLeave: () => void;
  onReady: () => void;
  onStartGame: () => void;
  onInvite: () => void;
  onSendMessage: (message: string) => void;
}

const LobbyDetail: React.FC<LobbyDetailProps> = ({
  lobby,
  currentUserId,
  onLeave,
  onReady,
  onStartGame,
  onInvite,
  onSendMessage,
}) => {
  const [chatMessage, setChatMessage] = useState("");
  const currentUser = lobby.users.find((u) => u.id === currentUserId);
  const isOwner = currentUser?.isOwner || false;
  const allReady = lobby.users.every((u) => u.isReady);
  const canStart = allReady && lobby.users.length >= 2 && isOwner;

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      onSendMessage(chatMessage);
      setChatMessage("");
    }
  };

  return (
    <div className="lobby-detail">
      <div className="lobby-detail-header">
        <div className="lobby-detail-info">
          <h2 className="lobby-detail-title">{lobby.name}</h2>
          <span className="lobby-detail-mode">{lobby.gameMode} Mode</span>
        </div>
        <button className="lobby-leave-button" onClick={onLeave}>
          <X className="button-icon" />
          Leave Lobby
        </button>
      </div>

      <div className="lobby-detail-content">
        <div className="lobby-detail-main">
          <div className="lobby-players-section">
            <h3 className="section-title">
              Players ({lobby.users.length}/{lobby.maxPlayers})
            </h3>
            <div className="players-list">
              {lobby.users.map((user) => (
                <div key={user.id} className="player-item">
                  <div className="player-info">
                    {user.isOwner && <Crown className="player-crown" />}
                    <span className="player-name">{user.name}</span>
                    {user.id === currentUserId && (
                      <span className="player-you">(You)</span>
                    )}
                  </div>
                  <div
                    className={`player-status ${user.isReady ? "status-ready" : "status-not-ready"}`}
                  >
                    {user.isReady ? (
                      <>
                        <Check className="status-icon" />
                        Ready
                      </>
                    ) : (
                      <>
                        <Clock className="status-icon" />
                        Not Ready
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lobby-settings-section">
            <h3 className="section-title">Game Settings</h3>
            <div className="settings-display">
              <div className="setting-display-item">
                <Palette className="setting-display-icon" />
                <span>{lobby.settings.colors} Colors</span>
              </div>
              <div className="setting-display-item">
                <Hash className="setting-display-icon" />
                <span>{lobby.settings.cardsPerPlayer} Cards per Player</span>
              </div>
              <div className="setting-display-item">
                <span>{lobby.settings.hintTokens} Hint Tokens</span>
              </div>
              <div className="setting-display-item">
                <span>{lobby.settings.strikeTokens} Strike Tokens</span>
              </div>
              {lobby.settings.multicolor && (
                <div className="setting-display-item">
                  <Sparkles className="setting-display-icon" />
                  <span>Multicolor Cards</span>
                </div>
              )}
              {lobby.settings.timed && (
                <div className="setting-display-item">
                  <Timer className="setting-display-icon" />
                  <span>{lobby.settings.timeLimit}s Time Limit</span>
                </div>
              )}
            </div>
          </div>

          <div className="lobby-actions-section">
            <div className="lobby-action-buttons">
              <button
                className={`lobby-ready-button ${currentUser?.isReady ? "ready-active" : ""}`}
                onClick={onReady}
              >
                {currentUser?.isReady ? (
                  <>
                    <Check className="button-icon" />
                    Ready!
                  </>
                ) : (
                  <>
                    <Clock className="button-icon" />
                    Ready Up
                  </>
                )}
              </button>

              <button className="lobby-invite-button" onClick={onInvite}>
                <Users className="button-icon" />
                Invite Friends
              </button>

              {isOwner && (
                <button
                  className={`lobby-start-button ${!canStart ? "lobby-button-disabled" : ""}`}
                  onClick={onStartGame}
                  disabled={!canStart}
                >
                  <Play className="button-icon" />
                  Start Game
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lobby-chat">
          <div className="chat-header">
            <MessageCircle className="chat-icon" />
            <h3 className="chat-title">Chat</h3>
          </div>

          <div className="chat-messages">
            {lobby.chat.map((msg) => (
              <div key={msg.id} className="chat-message">
                <span className="chat-username">{msg.userName}:</span>
                <span className="chat-text">{msg.message}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button className="chat-send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LobbyDetail;
