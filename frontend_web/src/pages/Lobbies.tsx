import { useState } from "react";
import { Plus } from "lucide-react";

import mockLobbies from "@/constants/mockLobbies";
import type { Lobby, GameSettings } from "@/types";
import LobbyDetail from "@/components/Lobbies/LobbyDetails";
import CreateLobbyModal from "@/components/Lobbies/CreateLobbyModal";
import LobbyListing from "@/components/Lobbies/LobbyListing";

const Lobbies: React.FC = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>(mockLobbies);
  const [selectedLobby, setSelectedLobby] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUserId] = useState("user123"); // This would come from auth context

  const handleJoinLobby = (lobbyId: string) => {
    setSelectedLobby(lobbyId);
  };

  const handleSpectate = (lobbyId: string) => {
    console.log("Spectating lobby:", lobbyId);
  };

  const handleCreateLobby = (
    name: string,
    settings: GameSettings,
    isPrivate: boolean
  ) => {
    const newLobby: Lobby = {
      id: Date.now().toString(),
      name,
      owner: {
        id: currentUserId,
        name: "Current User",
        isReady: true,
        isOwner: true,
      },
      users: [
        {
          id: currentUserId,
          name: "Current User",
          isReady: true,
          isOwner: true,
        },
      ],
      maxPlayers: 5,
      isPrivate,
      status: "waiting",
      gameMode: "Classic",
      settings,
      chat: [],
    };
    setLobbies([...lobbies, newLobby]);
    setSelectedLobby(newLobby.id);
  };

  const handleLeaveLobby = () => {
    setSelectedLobby(null);
  };

  const handleReady = () => {
    console.log("Toggle ready status");
  };

  const handleStartGame = () => {
    console.log("Starting game");
  };

  const handleInvite = () => {
    console.log("Inviting friends");
  };

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  const currentLobby = selectedLobby
    ? lobbies.find((l) => l.id === selectedLobby)
    : null;

  if (currentLobby) {
    return (
      <div className="lobbies-container">
        <LobbyDetail
          lobby={currentLobby}
          currentUserId={currentUserId}
          onLeave={handleLeaveLobby}
          onReady={handleReady}
          onStartGame={handleStartGame}
          onInvite={handleInvite}
          onSendMessage={handleSendMessage}
        />
      </div>
    );
  }

  return (
    <div className="lobbies-container">
      <div className="lobbies-header">
        <h1 className="lobbies-title">Game Lobbies</h1>
        <button
          className="create-lobby-button"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="button-icon" />
          Create Lobby
        </button>
      </div>

      <div className="lobbies-list">
        {lobbies.map((lobby) => (
          <LobbyListing
            key={lobby.id}
            lobby={lobby}
            onJoin={handleJoinLobby}
            onSpectate={handleSpectate}
          />
        ))}
      </div>

      <CreateLobbyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateLobby}
      />
    </div>
  );
};

export default Lobbies;
