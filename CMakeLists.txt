cmake_minimum_required(VERSION 3.31)
project(hanabi_plus LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

add_subdirectory(hanabi)
#add_subdirectory(server)
#add_subdirectory(hanabi_py)

#target_link_libraries(hanabi_plus PRIVATE hanabi)

#target_sources(hanabi_plus
#        PUBLIC
#        FILE_SET cxx_modules TYPE CXX_MODULES FILES hanabi.cppm
#)


