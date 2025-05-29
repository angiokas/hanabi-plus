cmake_minimum_required(VERSION 3.31)
project(hanabi_plus LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(hanabi_plus main.cpp)

add_subdirectory(hanabi)
add_subdirectory(server)
add_subdirectory(hanabi_py)

target_link_libraries(hanabi_plus PRIVATE hanabi)

target_sources(hanabi_plus
        PUBLIC
        FILE_SET cxx_modules TYPE CXX_MODULES FILES hanabi.cppm
)