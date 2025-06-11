//
// Created by annie on 5/28/2025.
//

#include "Session.h"
#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_generators.hpp>
#include <boost/uuid/uuid_io.hpp>
namespace basio = boost::asio;

std::string extract_line(boost::asio::streambuf &buf) {
    std::istream is(&buf);
    std::string line;
    std::getline(is, line);
    if (!line.empty() && line.back() == '\r') line.pop_back(); // Remove trailing '\r' if present
    return line;
}

Session::Session(const std::string &sessionId, std::shared_ptr<boost::asio::ip::tcp::socket> sock)
    : id(sessionId),
      socket(std::move(sock)),
      isOpen(true),
      connectedAt(std::chrono::steady_clock::now()) {
    try {
        ipAddress = socket->remote_endpoint().address().to_string() + ":" +
                    std::to_string(socket->remote_endpoint().port());
    } catch (const std::exception &e) {
        ipAddress = "Unknown";
    }
}

Session::Session(std::shared_ptr<boost::asio::ip::tcp::socket> sock)
    : socket(std::move(sock)), isOpen(true), connectedAt(std::chrono::steady_clock::now()) {
    boost::uuids::random_generator generator;
    const boost::uuids::uuid uuid = generator();
    const std::string uuidStr = to_string(uuid);
    id = uuidStr;

    try {
        ipAddress = socket->remote_endpoint().address().to_string() + ":" +
                    std::to_string(socket->remote_endpoint().port());
    } catch (const std::exception &e) {
        ipAddress = "Unknown";
    }
}


void Session::Close() const {
    if (isOpen) {
        boost::system::error_code ec;
        socket->shutdown(basio::ip::tcp::socket::shutdown_both, ec);
        if (ec) {
            std::cout << "Error: " << ec << std::endl;
        } else {
            std::cout << "Closed session with id=" << id << std::endl;
        }
    }
}

void Session::StartAsyncRead() {
    if (!socket->is_open()) {
        std::cout << "Socket is not open before write!" << std::endl;
        return;
    }
    auto self = shared_from_this();
    self->send_message("Write command:\n");
    basio::async_read_until(*socket, requestBuffer, '\n',
                            [self](const boost::system::error_code &ec, std::size_t bytes_transferred) {
                                if (bytes_transferred == 0) {
                                    std::cout << "ZERO BYTES DETECTED, PLEASE TYPE SOMETHING VALID" << std::endl;
                                    self->StartAsyncRead();
                                }
                                if (ec) {
                                    if (ec == basio::error::eof) {
                                        std::cout << "Client disconnected: (EOF)" << std::endl;
                                    } else if (ec == basio::error::operation_aborted) {
                                        std::cout << "Operation cancelled!" << std::endl;
                                    } else if (ec == basio::error::broken_pipe) {
                                        std::cout << "Client closed connection during write." << std::endl;
                                    } else {
                                        std::cout << "Error occurred!\n"
                                                << "  Code    : " << ec.value() << "\n"
                                                << "  Message : " << ec.message() << "\n"
                                                << "  Category: " << ec.category().name() << std::endl;
                                    }

                                    boost::system::error_code ignored_ec;
                                    (*self->socket).shutdown(basio::ip::tcp::socket::shutdown_both, ignored_ec);
                                    (*self->socket).close(ignored_ec);
                                    std::cout << "Shut down socket!" << std::endl;
                                    return;
                                }
                                if (self->requestBuffer.size() > 1024) {
                                    std::cout << "Message too large, closing connection" << std::endl;
                                    (*self->socket).close();
                                    return;
                                }
                                std::string request = extract_line(self->requestBuffer);
                                self->onRequestReceived(request);
                            }
    );
}

void Session::send_message(const std::string &message) {
    auto self = shared_from_this();
    basio::async_write(*socket, basio::buffer(message),
                       [self, message](const boost::system::error_code &ec, std::size_t) {
                           if (ec) {
                               std::cout << "Write error: " << ec.message() << "\n";
                           } else {
                               std::cout << "Message sent from SessionID=" << self->id << ":" << std::endl;
                               std::cout << message << std::endl;
                           }
                           //onResponseSent(ec, bytes_transferred);
                       });
}

void Session::onRequestReceived(const std::string &request) {
    std::cout << "Received request from SessionID=" << id << ":" << std::endl;
    std::cout << request << std::endl;
    StartAsyncRead();

    //std::string m_response = ProcessRequest(m_request);
    //send_message(m_response);
}
