import type { PlayerData } from "@/types";
const mockPlayers: PlayerData[] = [
    {
      id: "1",
      name: "You",
      isCurrentPlayer: true,
      hand: [
        { id: "1", color: "red", rank: 1, colorShown: false, rankShown: false },
        {
          id: "2",
          color: "blue",
          rank: 2,
          colorShown: false,
          rankShown: false,
        },
        {
          id: "3",
          color: "green",
          rank: 3,
          colorShown: false,
          rankShown: false,
        },
        {
          id: "4",
          color: "yellow",
          rank: 1,
          colorShown: false,
          rankShown: false,
        },
        {
          id: "5",
          color: "white",
          rank: 2,
          colorShown: false,
          rankShown: false,
        },
      ],
    },
    {
      id: "2",
      name: "Player 2",
      isCurrentPlayer: false,
      hand: [
        { id: "6", color: "red", rank: 2, colorShown: true, rankShown: true },
        { id: "7", color: "blue", rank: 1, colorShown: true, rankShown: true },
        { id: "8", color: "green", rank: 4, colorShown: true, rankShown: true },
        {
          id: "9",
          color: "yellow",
          rank: 3,
          colorShown: true,
          rankShown: true,
        },
        {
          id: "10",
          color: "white",
          rank: 1,
          colorShown: true,
          rankShown: true,
        },
      ],
    },
    {
      id: "3",
      name: "Player 3",
      isCurrentPlayer: false,
      hand: [
        { id: "11", color: "red", rank: 3, colorShown: true, rankShown: true },
        { id: "12", color: "blue", rank: 5, colorShown: true, rankShown: true },
        {
          id: "13",
          color: "green",
          rank: 1,
          colorShown: true,
          rankShown: true,
        },
        {
          id: "14",
          color: "yellow",
          rank: 2,
          colorShown: true,
          rankShown: true,
        },
        {
          id: "15",
          color: "white",
          rank: 4,
          colorShown: true,
          rankShown: true,
        },
      ],
    },
  ];

export default mockPlayers;