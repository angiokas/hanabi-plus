//
// Created by annie on 5/22/2025.
//

#ifndef PILE_H
#define PILE_H

#include <string>
#include <utility>
#include <vector>

namespace hanabi {
    class Pile {
        public:
            std::vector<std::pair<int, int>> cards; //<suit, card>
        explicit Pile();
        explicit Pile(std::vector<std::pair<int, int>> cards);
        explicit Pile(const int numberOfSuits, const std::vector <int> &rankDistr);
        void shuffle();

    };
    std::ostream& operator<<(std::ostream& os, const Pile& pile);

} // hanabi

#endif //PILE_H
