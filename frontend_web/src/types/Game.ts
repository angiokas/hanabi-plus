export interface CardData {
  id: string;
  color: "red" | "blue" | "green" | "yellow" | "white";
  rank: number;
  colorShown: boolean;
  rankShown: boolean;
}

export interface PlayerData {
  id: string;
  name: string;
  hand: CardData[];
  isCurrentPlayer: boolean;
}

export interface GameLogEntry {
  id: string;
  timestamp: string;
  action: string;
  player: string;
}
