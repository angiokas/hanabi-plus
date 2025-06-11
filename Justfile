default:
    @echo "bla"
configure:
    /snap/bin/cmake --preset=default

# Build using CMake preset
build: configure
    /snap/bin/cmake --build --preset=default

# Run the executable (assumes it's in the build dir)
run-server: build
    ./build/default/bin/server

run-hanabi: build
    ./build/default/bin/hanabi_game