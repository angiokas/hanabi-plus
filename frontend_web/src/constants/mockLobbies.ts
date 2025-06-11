import type {Lobby} from "@/types"
const mockLobbies: Lobby[] = [
  {
    id: "1",
    name: "Casual Game Night",
    owner: { id: "1", name: "Alice", isReady: true, isOwner: true },
    users: [
      { id: "1", name: "Alice", isReady: true, isOwner: true },
      { id: "2", name: "Bob", isReady: false, isOwner: false },
      { id: "3", name: "Charlie", isReady: true, isOwner: false },
    ],
    maxPlayers: 5,
    isPrivate: false,
    status: "waiting",
    gameMode: "Classic",
    settings: {
      colors: 5,
      cardsPerPlayer: 5,
      hintTokens: 8,
      strikeTokens: 3,
      multicolor: false,
      timed: false,
    },
    chat: [
      {
        id: "1",
        userId: "1",
        userName: "Alice",
        message: "Welcome everyone!",
        timestamp: new Date(),
      },
      {
        id: "2",
        userId: "2",
        userName: "Bob",
        message: "Ready to play!",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Pro Players Only",
    owner: { id: "4", name: "Diana", isReady: true, isOwner: true },
    users: [
      { id: "4", name: "Diana", isReady: true, isOwner: true },
      { id: "5", name: "Eve", isReady: true, isOwner: false },
    ],
    maxPlayers: 4,
    isPrivate: true,
    status: "in-game",
    gameMode: "Expert",
    settings: {
      colors: 6,
      cardsPerPlayer: 4,
      hintTokens: 6,
      strikeTokens: 2,
      multicolor: true,
      timed: true,
      timeLimit: 120,
    },
    chat: [],
  },
];

export default mockLobbies;