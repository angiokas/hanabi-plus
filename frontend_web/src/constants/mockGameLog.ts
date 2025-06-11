import type { GameLogEntry } from "@/types";  
const mockGameLog: GameLogEntry[] = [
    { id: "1", timestamp: "10:30", action: "played Red 1", player: "Player 2" },
    {
      id: "2",
      timestamp: "10:31",
      action: "gave a hint about Blue cards",
      player: "You",
    },
    {
      id: "3",
      timestamp: "10:32",
      action: "discarded Green 4",
      player: "Player 3",
    },
  ];

  export default mockGameLog;