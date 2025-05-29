cmake_minimum_required(VERSION 3.31)
project(hanabi_py LANGUAGES CXX)

find_package(pybind11 REQUIRED)

add_library(hanabi_py MODULE hanabi_py.cpp)

target_link_libraries(hanabi_py PRIVATE hanabi)

set_target_properties(hanabi_py PROPERTIES
        PREFIX ""
        SUFFIX "${PYTHON_MODULE_EXTENSION}"
)