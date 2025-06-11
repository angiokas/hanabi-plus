import React, { useState } from "react";
import { Play, Trash2, MessageCircle } from "lucide-react";
import PlayerHand from "@/components/GameSession/PlayerHand";
import StatusBar from "@/components/GameSession/StatusBar";
import Board from "@/components/GameSession/Board";
import DrawPile from "@/components/GameSession/DrawPile";
import DiscardPile from "@/components/GameSession/DiscardPile";
import Action from "@/components/GameSession/Action";
import GameLog from "@/components/GameSession/GameLog";

import mockDiscardPile from "@/constants/mockDiscardPile";
import mockGameLog from "@/constants/mockGameLog";
import mockPlayers from "@/constants/mockPlayers";
import mockStacks from "@/constants/mockStacks";

const GameSession: React.FC = () => {
  const [logVisible, setLogVisible] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
  };

  return (
    <div className="hanabi-game">
      <div className="game-header">
        <h1 className="game-title">Hanabi</h1>
        <StatusBar score={5} hintTokens={6} fuseTokens={3} />
      </div>

      <div className="game-content">
        <div className="game-main">
          <Board stacks={mockStacks} />

          <div className="piles-area">
            <DrawPile count={35} />
            <DiscardPile cards={mockDiscardPile} />
          </div>

          <div className="players-area">
            {mockPlayers.map((player) => (
              <PlayerHand key={player.id} player={player} />
            ))}
          </div>

          <div className="actions-area">
            <div className="actions-title">Actions</div>
            <div className="actions-buttons">
              <Action
                icon={<Play size={20} />}
                label="Play Card"
                onClick={() => handleAction("play")}
              />
              <Action
                icon={<Trash2 size={20} />}
                label="Discard Card"
                onClick={() => handleAction("discard")}
              />
              <Action
                icon={<MessageCircle size={20} />}
                label="Give Hint"
                onClick={() => handleAction("hint")}
              />
            </div>
          </div>
        </div>

        <GameLog
          entries={mockGameLog}
          isVisible={logVisible}
          onToggle={() => setLogVisible(!logVisible)}
        />
      </div>
    </div>
  );
};

export default GameSession;
