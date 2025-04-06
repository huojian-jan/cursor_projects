#ifndef MYLIB_H
#define MYLIB_H

namespace mylib {

/**
 * @brief 一个简单的示例类
 */
class Calculator {
public:
    /**
     * @brief 默认构造函数
     */
    Calculator();

    /**
     * @brief 加法函数
     * @param a 第一个操作数
     * @param b 第二个操作数
     * @return 两数之和
     */
    int add(int a, int b) const;

    /**
     * @brief 减法函数
     * @param a 第一个操作数
     * @param b 第二个操作数
     * @return 两数之差
     */
    int subtract(int a, int b) const;
};

} // namespace mylib

#endif // MYLIB_H 