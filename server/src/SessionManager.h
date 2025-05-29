//
// Created by annie on 5/28/2025.
//

#ifndef SESSIONMANAGER_H
#define SESSIONMANAGER_H

#include <boost/asio.hpp>
#include "Session.h"
#include <string>
namespace basio = boost::asio;

class SessionManager {
public:
    SessionManager(basio::io_context& ios, unsigned short port_num);
    SessionManager(basio::io_context& ios);
    void addSession(std::shared_ptr<Session> session);
    void closeSession(const std::string &id);
    std::shared_ptr<Session> getSession(std::string id);

    void disconnectAll();
    void listSessions();

    void StartAcceptor();
    void StopAcceptor();



private:
    void InitAccept();
    void onAccept(const boost::system::error_code& ec, const std::shared_ptr<basio::ip::tcp::socket>& sock);

    basio::io_context& io;
    const unsigned short port_num;
    basio::ip::tcp::acceptor acceptor;
    std::atomic<bool> isStopped;
    std::unordered_map<std::string, std::shared_ptr<Session>> sessions;

};

#endif //SESSIONMANAGER_H
