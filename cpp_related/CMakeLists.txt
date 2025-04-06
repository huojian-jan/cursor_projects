cmake_minimum_required(VERSION 3.14)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# 启用 IDE 文件夹
set_property(GLOBAL PROPERTY USE_FOLDERS ON)

# 配置编译选项
if(MSVC)
    # Visual Studio 编译选项
    add_compile_options(/W4 /MP)
    # 启用多处理器编译
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /MP")
    # 禁用特定警告
    add_compile_options(/wd4251 /wd4275)
else()
    # GCC/Clang 编译选项
    add_compile_options(-Wall -Wextra)
endif()

# 添加静态库
add_library(mylib STATIC
    src/mylib.cpp
)

# 设置库的包含目录
target_include_directories(mylib
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
)

# 添加测试子目录
add_subdirectory(tests)

# 设置全局启动项目（Visual Studio 特有）
if(MSVC)
    set_property(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} PROPERTY VS_STARTUP_PROJECT mylib_test)
endif()

# 安装配置（可选）
install(TARGETS mylib
    ARCHIVE DESTINATION lib
    LIBRARY DESTINATION lib
    RUNTIME DESTINATION bin
)

install(DIRECTORY include/ DESTINATION include) 