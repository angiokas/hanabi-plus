#include <iostream>
#include "hanabi/src/Game.h"
int main() {
    std::cout << "Starting the game!" << std::endl;
    hanabi::Game game(2,5,5,8,3,{3,2,2,2,1});  // Initialize the game object
    std::cout << game << std::endl;
    return 0;
}