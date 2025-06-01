//
// Created by annie on 5/24/2025.
//

#ifndef SERVER_H
#define SERVER_H
#include <boost/asio.hpp>
#include "SessionManager.h"
namespace basio = boost::asio;

class Server {
public:
    Server();
    void Start(unsigned short port_num);
    void Stop();

private:
    basio::io_context io_context;
    std::shared_ptr<SessionManager> sessionManager;
};



#endif //SERVER_H
