import type { GameSettings, CreateLobbyModalProps } from "@/types";
import { useState } from "react";
import defaultSettings from "@/constants/defaultSettings";
import { X, Palette, Hash, Timer, Sparkles } from "lucide-react";

const CreateLobbyModal: React.FC<CreateLobbyModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [lobbyName, setLobbyName] = useState("");
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (lobbyName.trim()) {
      onCreate(lobbyName, settings, isPrivate);
      setLobbyName("");
      setSettings(defaultSettings);
      setIsPrivate(false);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Create New Lobby</h2>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Lobby Name</label>
            <input
              type="text"
              className="form-input"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              placeholder="Enter lobby name..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Privacy</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <span className="checkbox-text">Private Lobby</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-title">Game Settings</h3>

            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  <Palette className="setting-icon" />
                  Colors
                </label>
                <select
                  className="setting-select"
                  value={settings.colors}
                  onChange={(e) =>
                    setSettings({ ...settings, colors: Number(e.target.value) })
                  }
                >
                  <option value={4}>4 Colors</option>
                  <option value={5}>5 Colors</option>
                  <option value={6}>6 Colors</option>
                </select>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <Hash className="setting-icon" />
                  Cards per Player
                </label>
                <select
                  className="setting-select"
                  value={settings.cardsPerPlayer}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      cardsPerPlayer: Number(e.target.value),
                    })
                  }
                >
                  <option value={4}>4 Cards</option>
                  <option value={5}>5 Cards</option>
                  <option value={6}>6 Cards</option>
                </select>
              </div>

              <div className="setting-item">
                <label className="setting-label">Hint Tokens</label>
                <select
                  className="setting-select"
                  value={settings.hintTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hintTokens: Number(e.target.value),
                    })
                  }
                >
                  <option value={6}>6 Tokens</option>
                  <option value={8}>8 Tokens</option>
                  <option value={10}>10 Tokens</option>
                </select>
              </div>

              <div className="setting-item">
                <label className="setting-label">Strike Tokens</label>
                <select
                  className="setting-select"
                  value={settings.strikeTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      strikeTokens: Number(e.target.value),
                    })
                  }
                >
                  <option value={2}>2 Strikes</option>
                  <option value={3}>3 Strikes</option>
                  <option value={4}>4 Strikes</option>
                </select>
              </div>
            </div>

            <div className="settings-toggles">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.multicolor}
                  onChange={(e) =>
                    setSettings({ ...settings, multicolor: e.target.checked })
                  }
                />
                <Sparkles className="toggle-icon" />
                <span className="toggle-text">Multicolor Cards</span>
              </label>

              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.timed}
                  onChange={(e) =>
                    setSettings({ ...settings, timed: e.target.checked })
                  }
                />
                <Timer className="toggle-icon" />
                <span className="toggle-text">Timed Game</span>
              </label>
            </div>

            {settings.timed && (
              <div className="form-group">
                <label className="form-label">Time Limit (seconds)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.timeLimit || 60}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      timeLimit: Number(e.target.value),
                    })
                  }
                  min={30}
                  max={300}
                />
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-create" onClick={handleCreate}>
            Create Lobby
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLobbyModal;
