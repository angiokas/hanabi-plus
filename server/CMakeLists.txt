cmake_minimum_required(VERSION 3.31)
project(server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(server src/main.cpp src/Server.cpp src/SessionManager.cpp src/Session.cpp)

target_link_libraries(server PRIVATE hanabi)