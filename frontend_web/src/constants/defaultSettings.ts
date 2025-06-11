import type { GameSettings } from "@/types";
const defaultSettings: GameSettings = {
  colors: 5,
  cardsPerPlayer: 5,
  hintTokens: 8,
  strikeTokens: 3,
  multicolor: false,
  timed: false,
};

export default defaultSettings;