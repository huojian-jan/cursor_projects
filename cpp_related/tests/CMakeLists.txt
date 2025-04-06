# 添加测试可执行程序
add_executable(mylib_test
    test_main.cpp
)

# 链接静态库
target_link_libraries(mylib_test
    PRIVATE
        mylib
)

# 设置包含目录
target_include_directories(mylib_test
    PRIVATE
        ${CMAKE_SOURCE_DIR}/include
)

# 设置 IDE 文件夹
set_target_properties(mylib_test PROPERTIES FOLDER "Tests")

# 设置为启动项目（Visual Studio 特有）
if(MSVC)
    set_property(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} PROPERTY VS_STARTUP_PROJECT mylib_test)
endif() 