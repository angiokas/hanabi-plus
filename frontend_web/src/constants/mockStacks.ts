  const mockStacks = [
    {
      color: "red" as const,
      topCard: {
        id: "r1",
        color: "red" as const,
        rank: 1,
        colorShown: true,
        rankShown: true,
      },
    },
    { color: "blue" as const },
    { color: "green" as const },
    { color: "yellow" as const },
    { color: "white" as const },
  ];

  export default mockStacks;