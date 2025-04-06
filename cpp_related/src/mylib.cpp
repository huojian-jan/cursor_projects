#include "mylib/mylib.h"

namespace mylib {

Calculator::Calculator() = default;

int Calculator::add(int a, int b) const {
    return a + b;
}

int Calculator::subtract(int a, int b) const {
    return a - b;
}

} // namespace mylib 