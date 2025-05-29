//
// Created by annie on 5/23/2025.
//

#ifndef GAME_H
#define GAME_H
#include "Pile.h"
#include <unordered_map>
#include <iostream>

namespace hanabi {

class Game {
    public:
        Pile drawPile;
        Pile discardPile;
        std::vector<Pile> playerHands;
        std::unordered_map<int, int> playPile;
        int clues = 8;
        int fuses = 3;
        int score = 0;

    explicit Game(int numPlayers, int cardsPerHand, int numberOfSuits, int clues, int fuses, const std::vector<int> &rankDistr);

};
    std::ostream& operator<<(std::ostream& os, const Game& game);
} // hanabi

#endif //GAME_H
