//
// Created by annie on 5/23/2025.
//
#include <boost/asio.hpp>
#include <iostream>

#include <Game.h>
#include "Server.h"

int main() {
    try {
        unsigned short port = 12345;

        Server server;
        server.Start(port);
        std::cout << "Server stopped." << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    return 0;

}
