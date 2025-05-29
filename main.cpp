#include <iostream>
#include "hanabi/src/Game.h"

int main() {
    std::cout << "Starting the game!" << std::endl;
    hanabi::Settings defaultSettings{2, 5, 5, 8, 3, {3, 2, 2, 2, 1}};
    hanabi::Game game(defaultSettings); // Initialize the game object
    std::cout << game << std::endl;
    game.PlayCard(0,2);
    game.PlayCard(1,4);
    return 0;
}
