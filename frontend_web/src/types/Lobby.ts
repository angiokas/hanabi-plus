import type {User} from "@/types"

export interface GameSettings {
  colors: number;
  cardsPerPlayer: number;
  hintTokens: number;
  strikeTokens: number;
  multicolor: boolean;
  timed: boolean;
  timeLimit?: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}

export interface Lobby {
  id: string;
  name: string;
  owner: User;
  users: User[];
  maxPlayers: number;
  isPrivate: boolean;
  status: "waiting" | "in-game";
  gameMode: string;
  settings: GameSettings;
  chat: ChatMessage[];
}

export interface LobbyListingProps {
  lobby: Lobby;
  onJoin: (lobbyId: string) => void;
  onSpectate: (lobbyId: string) => void;
}

export interface CreateLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, settings: GameSettings, isPrivate: boolean) => void;
}