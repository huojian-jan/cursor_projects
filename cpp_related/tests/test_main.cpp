#include <iostream>
#include "mylib/mylib.h"

int main() {
    mylib::Calculator calc;
    
    std::cout << "Testing mylib Calculator:" << std::endl;
    
    int a = 10;
    int b = 5;
    
    std::cout << a << " + " << b << " = " << calc.add(a, b) << std::endl;
    std::cout << a << " - " << b << " = " << calc.subtract(a, b) << std::endl;
    
    // 添加断点测试
    int result = calc.add(a, b);
    if (result == 15) {
        std::cout << "Test passed!" << std::endl;
    } else {
        std::cout << "Test failed!" << std::endl;
    }
    
    return 0;
} 