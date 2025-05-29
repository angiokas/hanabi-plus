//
// Created by annie on 5/28/2025.
//

#include "SessionManager.h"
#include <iostream>
#include <ranges>
namespace basio = boost::asio;

SessionManager::SessionManager(basio::io_context &ios): SessionManager(ios, 12345) {
}

SessionManager::SessionManager(basio::io_context &ios, unsigned short port)
    : io(ios),
      port_num(port),
      acceptor(io, basio::ip::tcp::endpoint(basio::ip::address_v4::any(), port_num)) {
}

void SessionManager::addSession(std::shared_ptr<Session> session) {
    //Maybe later: Maybe add a way to use IP and ports to recognize connections.
    sessions[session->id] = session;
}

std::shared_ptr<Session> SessionManager::getSession(std::string id) {
    const auto it = sessions.find(id);
    if (it == sessions.end()) {
        std::cout << "Session with id=" << id << " not found." << std::endl;
    }
    return it->second;
}

void SessionManager::listSessions() {
    std::cout << "--------------------------------------------" <<std::endl;
    std::cout << "Total Active Sessions: " << sessions.size() << std::endl;
    std::cout << "--------------------------------------------" <<std::endl;
    for (const auto &id: sessions | std::views::keys) {
        std::cout << "SessionID=" << id << std::endl;
    }
}

void SessionManager::closeSession(const std::string &id) {
    getSession(id)->Close();
}

void SessionManager::disconnectAll() {
    for (const auto &session: sessions | std::views::values) {
        session->Close();
    }
}

void SessionManager::StartAcceptor() {
    std::cout << "Accepting connections!" << std::endl;
    isStopped.store(false);
    InitAccept();
}

void SessionManager::StopAcceptor() {
    isStopped.store(true);
    acceptor.cancel();
    std::cout << "Cancelled any unfinished async tasks." << std::endl;
    acceptor.close();
    std::cout << "Closed Acceptor." << std::endl;
}

void SessionManager::InitAccept() {
    auto sock = std::make_shared<basio::ip::tcp::socket>(io);
    acceptor.async_accept(*sock,
                          [this, sock](const boost::system::error_code &ec) {
                              onAccept(ec, sock);
                          });
}

void SessionManager::onAccept(const boost::system::error_code &ec,
                              const std::shared_ptr<basio::ip::tcp::socket> &sock) {
    if (ec) {
        std::cerr << "Accept error: " << ec.message() << std::endl;
    } else {
        std::shared_ptr<Session> session = std::make_shared<Session>(std::to_string(sessions.size()),sock);
        std::cout << "Successfully accepted connection! Client connected from " << session->ipAddress << "------------------"<< std::endl;
        addSession(session);
        listSessions();
        session->StartAsyncRead();

        // Start client session
        //std::make_shared<RequestHandler>(sock)->StartReading();
    }

    // Accept next connection
    if (!isStopped.load()) {
        std::cout << "Accepting next connection!" << std::endl;
        InitAccept();
    } else StopAcceptor();
}
