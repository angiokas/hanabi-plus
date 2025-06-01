//
// Created by annie on 5/28/2025.
//

#ifndef SESSION_H
#define SESSION_H
#pragma once

#include <boost/asio.hpp>
#include "RequestHandler.h"
#include <memory>
#include <string>
#include <chrono>
#include <iostream>
namespace basio = boost::asio;
using tcp = boost::asio::ip::tcp;

class Session : public std::enable_shared_from_this<Session> {
public:
    std::string id;
    std::shared_ptr<basio::ip::tcp::socket> socket;
    bool isOpen = false;
    std::string ipAddress;
    std::chrono::steady_clock::time_point connectedAt;
    std::chrono::steady_clock::time_point disconnectedAt;
    std::string disconnectReason;

    basio::streambuf requestBuffer;

    void send_message(const std::string& message);
    void StartAsyncRead();
    void onRequestReceived(const std::string& request);



    Session(const std::string &id, std::shared_ptr<tcp::socket> sock);
    explicit Session(std::shared_ptr<boost::asio::ip::tcp::socket> sock);
    void Close() const;



};

#endif //SESSION_H
