cmake_minimum_required(VERSION 3.31)
project(hanabi LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(INCLUDE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/include)
#HANABILIBRARY
add_library(hanabi SHARED src/hanabi/game.cpp)
target_include_directories(hanabi PUBLIC ${INCLUDE_DIR})

#EXECUTABLE
add_executable(hanabi_game main.cpp)
target_link_libraries(hanabi_game PUBLIC hanabi)
target_include_directories(hanabi_game PUBLIC ${INCLUDE_DIR})

#PYBIND MODULE
#find_package(pybind11 REQUIRED)
#add_library(hanabipy MODULE src/hanabipy/pybind_module.cpp)
#target_link_libraries(hanabipy PUBLIC hanabi pybind11::module)
#target_include_directories(hanabipy PUBLIC ${INCLUDE_DIR})
#set_target_properties(hanabipy PROPERTIES
#    PREFIX ""
#    OUTPUT_NAME "hanabipy"
#    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/hanabipy
#)
set(PYBIND11_FINDPYTHON ON)
find_package(pybind11 CONFIG REQUIRED)

pybind11_add_module(hanabipy src/hanabipy/hanabipy.cpp)
target_include_directories(hanabipy PUBLIC ${INCLUDE_DIR})
install(TARGETS hanabipy DESTINATION .)
set_target_properties(hanabipy PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/hanabipy")

#install(TARGETS hanabipy
#        LIBRARY DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/python${PYTHON_VERSION_MAJOR}.${PYTHON_VERSION_MINOR}/site-packages")