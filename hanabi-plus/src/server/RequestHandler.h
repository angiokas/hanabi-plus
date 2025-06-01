//
// Created by annie on 5/24/2025.
//
#ifndef CLIENTSESSION_H
#define CLIENTSESSION_H
#include <boost/asio.hpp>
#include <string>
namespace basio = boost::asio;

class RequestHandler {
    std::shared_ptr<basio::ip::tcp::socket> m_sock;
    std::string m_response;
    basio::streambuf m_request;
public:
    explicit RequestHandler(std::shared_ptr<basio::ip::tcp::socket>);
    void StartReading();
    void send_message(const std::string& message) const;

private:
    void onFinish() const;
    void onRequestReceived(const boost::system::error_code& ec,
    std::size_t bytes_transferred);

    void onResponseSent(const boost::system::error_code& ec, std::size_t bytes_transferred);
    std::string ProcessRequest(basio::streambuf& request);

};

#endif //CLIENTSESSION_H
