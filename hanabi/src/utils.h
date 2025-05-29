//
// Created by annie on 5/23/2025.
//

#ifndef UTILS_H
#define UTILS_H
#pragma once
#include <vector>
#include <stdexcept>

template<typename T>
std::vector<T> extract_slice(std::vector<T>& vec, size_t i, size_t j) {
    if (i > vec.size() || j > vec.size() || i > j) {
        throw std::out_of_range("Invalid slice (subvector) indices");
    }
    vec.erase(vec.begin() + i, vec.begin() + j);
    return std::vector<T>(vec.begin() + i, vec.begin() + j);
}
#endif //UTILS_H
