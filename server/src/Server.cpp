//
// Created by annie on 5/24/2025.
//

#include "Server.h"

#include <memory>
Server::Server(){}

void Server::Start(unsigned short port_num) {
    sessionManager = std::make_unique<SessionManager>(io_context, port_num);
    sessionManager->StartAcceptor();
    std::cout << "Server running on port " << port_num <<  std::endl;
    io_context.run();
}

void Server::Stop() {
    sessionManager-> StopAcceptor();
    io_context.stop();
}