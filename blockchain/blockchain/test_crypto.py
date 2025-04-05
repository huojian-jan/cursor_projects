# 测试Crypto包导入是否正常
try:
    from Crypto.PublicKey import RSA
    from Crypto.Signature import PKCS1_v1_5
    from Crypto.Hash import SHA256
    print("成功导入Crypto包，所有依赖已正确安装！")
except ImportError as e:
    print(f"导入错误: {e}")
    print("请确保已正确安装pycryptodome包") 