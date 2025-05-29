cmake_minimum_required(VERSION 3.31)
project(hanabi LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(hanabi STATIC
        src/Game.cpp
        src/Pile.cpp
)
target_include_directories(hanabi PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_compile_features(hanabi PUBLIC cxx_std_23)