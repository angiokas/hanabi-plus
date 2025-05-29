//
// Created by annie on 5/24/2025.
//

#include "RequestHandler.h"
#include <boost/asio.hpp>
#include <iostream>
#include <memory>
#include <string>
#include <utility>
namespace basio = boost::asio;

RequestHandler::RequestHandler(std::shared_ptr<basio::ip::tcp::socket> sock) : m_sock(std::move(sock)) {
};

void RequestHandler::send_message(const std::string &message) {
    basio::async_write(*m_sock, basio::buffer(message),
                       [this](boost::system::error_code ec, std::size_t) {
                           if (ec) {
                               std::cout << "Write error: " << ec.message() << "\n";
                           } else {
                               std::cout << "Message sent successfully\n";
                           }
                       });
}

void RequestHandler::StartReading() {
    std::cout << "Start!" << std::endl;

    if (!m_sock->is_open()) {
        std::cerr << "Socket is not open before write!" << std::endl;
        return;
    }
    std::cout << "Starting async read!" << std::endl;
    basio::async_read_until(*m_sock, m_request, '\n',
                            [this](const boost::system::error_code &ec, std::size_t bytes_transferred) {
                                send_message("Please enter your sqweeeeeeeeeeeeeeee:\n");
                                if (bytes_transferred == 0) {
                                    std::cout << "Connection closed or empty read.\n";
                                } else if (ec == boost::asio::error::eof) {
                                    std::cout << "EOF error " << ec.message() << "\n";
                                }
                                onRequestReceived(ec, bytes_transferred);
                            }
    );
};


void RequestHandler::onRequestReceived(const boost::system::error_code &ec,
                                       std::size_t bytes_transferred) {
    if (!m_sock->is_open()) {
        std::cout << "Socket is not open before write!" << std::endl;
        return;
    }
    if (bytes_transferred == 0) {
        std::cout << "NONZERO BYTES DETECTED, PLEASE TYPE SOMETHING VALID" << std::endl;
        StartReading();
    } else if (ec) {
        std::cout << "Error occurred!\n"
                << "  Code    : " << ec.value() << "\n"
                << "  Message : " << ec.message() << "\n"
                << "  Category: " << ec.category().name() << std::endl;

        onFinish();
        return;
    }
    std::cout << "REQUEST RECEIVED" << std::endl;
    m_response = ProcessRequest(m_request);
    basio::async_write(*m_sock, basio::buffer(m_response),
                       [this](
                   const boost::system::error_code &ec, std::size_t bytes_transferred) {
                           onResponseSent(ec, bytes_transferred);
                       });
}

void RequestHandler::onResponseSent(const boost::system::error_code &ec, std::size_t bytes_transferred) {
    std::cout << "onResponseSent" << std::endl;
    if (ec) {
        std::cout << "Error occured! Error code = "
                << ec.value()
                << ". Message: " << ec.message() << std::endl;
        onFinish();
    } else {
        std::cout << "RESPONSE SENT!" << std::endl;
    }
}

std::string RequestHandler::ProcessRequest(basio::streambuf &request) {
    std::istream is(&request);
    const std::string data((std::istreambuf_iterator(is)),
                           std::istreambuf_iterator<char>());
    std::cout << data << std::endl;
    std::cout << "ProcessRequest! " << std::endl;
    /*int i =0;
    while (i != 10000)
        i++;
    */
    std::string response = "Response\n";
    return response;
}

void RequestHandler::onFinish() const {
    std::cout << "onFinish: Shutting down socket!" << std::endl;
    boost::system::error_code ec;
    m_sock->shutdown(basio::ip::tcp::socket::shutdown_both, ec);
    m_sock->close(ec);
    if (ec) {
        std::cout << "Error Shutting down\n"
                << "  Code    : " << ec.value() << "\n"
                << "  Message : " << ec.message() << "\n"
                << "  Category: " << ec.category().name() << std::endl;
    }
}
