//
// Created by annie on 5/22/2025.
//

#include "Pile.h"

#include <algorithm>
#include <chrono>
#include <random>


namespace hanabi {
    enum class Suit : int {
        Red,
        Blue,
        Yellow,
        Green,
        White,
        Multi
    };
    Pile::Pile() {}

    Pile::Pile(std::vector<std::pair<int, int>> cards)
    : cards(std::move(cards)) {
    }

    Pile::Pile(const int numberOfSuits, const std::vector<int> &rankDistr) {
        const int n = rankDistr.size();

        for (int i = 0; i< numberOfSuits;i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < rankDistr[j];k++) {
                    cards.push_back({i,j});
                }
            }
        }
        shuffle();
    }


    void Pile::shuffle() {
        static std::random_device rd;
        static std::mt19937 rng(rd());
        std::ranges::shuffle(cards, rng);
    }

    std::ostream& operator<<(std::ostream& os, const Pile& pile) {
        os << "Pile contains " << pile.cards.size() << " cards:\n";
        for (const auto& card : pile.cards) {
            os << "(" << card.first << ", " << card.second << ") ";
        }
        return os;
    }

} // hanabi