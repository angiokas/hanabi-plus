#include <pybind11/pybind11.h>
#include "game.h"

namespace py = pybind11;

int f(int i) {
    return i +1000;
}

PYBIND11_MODULE(hanabipy, m) {
    m.def("f", &f, "Function f that returns x+1000");
}