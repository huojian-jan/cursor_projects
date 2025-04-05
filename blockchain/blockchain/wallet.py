import binascii
import Crypto.Random
from Crypto.PublicKey import RSA

class Wallet:
    def __init__(self):
        """创建一个新的钱包（密钥对）"""
        self.private_key = None
        self.public_key = None
        self.generate_keys()
    
    def generate_keys(self):
        """生成新的密钥对"""
        # 使用pycryptodome生成RSA密钥对
        random_gen = Crypto.Random.new().read
        private_key = RSA.generate(1024, random_gen)
        public_key = private_key.publickey()
        
        # 转换为十六进制字符串
        self.private_key = binascii.hexlify(private_key.exportKey(format='DER')).decode('ascii')
        self.public_key = binascii.hexlify(public_key.exportKey(format='DER')).decode('ascii')
    
    def get_address(self):
        """获取钱包地址（公钥）"""
        return self.public_key
    
    def get_private_key(self):
        """获取私钥"""
        return self.private_key 