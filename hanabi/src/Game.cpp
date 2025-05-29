//
// Created by annie on 5/23/2025.
//

#include "Game.h"
#include "Pile.h"
#include <iostream>
#include "utils.h"
namespace hanabi {
    Game::Game(const int numPlayers, const int cardsPerHand, const int numberOfSuits, int c, int f, const std::vector<int> &rankDistr) {
        drawPile = Pile(numberOfSuits, rankDistr);
        std::cout << drawPile << std::endl;
        for(int i =0; i< numPlayers; i++){
            Pile p = Pile(extract_slice(drawPile.cards,i*cardsPerHand,(i+1)*cardsPerHand));
            playerHands.push_back(p);
        }
        for (int i=0; i< numberOfSuits;i++) {
            playPile[i] = 0;
        }
        clues=c;
        fuses=f;

    }
    std::ostream& operator<<(std::ostream& os, const Game& game) {
        os << "Game State:\n";

        os << "Draw Pile:\n" << game.drawPile << "\n";
        os << "Discard Pile:\n" << game.discardPile << "\n";

        os << "Player Hands:\n";
        for (size_t i = 0; i < game.playerHands.size(); ++i) {
            os << "  Player " << i + 1 << ": " << game.playerHands[i] << "\n";
        }

        os << "Play Pile:\n";
        for (const auto& [key, value] : game.playPile) {
            os << "  " << key << ": " << value << "\n";
        }

        os << "Clues: " << game.clues << "\n";
        os << "Fuses: " << game.fuses << "\n";
        os << "Score: " << game.score << "\n";

        return os;
    }

    void bla(int i) {
        std::cout << i << std::endl;
    }

} // hanabi