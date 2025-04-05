import hashlib
import json
import binascii
import time
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256

class Transaction:
    def __init__(self, sender_address, recipient_address, amount):
        """
        初始化交易
        
        :param sender_address: 发送方的公钥
        :param recipient_address: 接收方的公钥
        :param amount: 交易金额
        """
        self.sender_address = sender_address
        self.recipient_address = recipient_address
        self.amount = amount
        self.timestamp = time.time()
        self.signature = None
    
    def to_dict(self):
        """将交易转换为字典格式"""
        return {
            'sender_address': self.sender_address,
            'recipient_address': self.recipient_address,
            'amount': self.amount,
            'timestamp': self.timestamp
        }
    
    def calculate_hash(self):
        """计算交易的哈希值"""
        transaction_dict = self.to_dict()
        transaction_string = json.dumps(transaction_dict, sort_keys=True).encode()
        return hashlib.sha256(transaction_string).hexdigest()
    
    def sign_transaction(self, private_key):
        """
        使用发送方的私钥对交易进行签名
        
        :param private_key: 发送方的私钥
        """
        # 如果发送方是系统(挖矿奖励)，不需要签名
        if self.sender_address == "system":
            self.signature = "system_reward"
            return True
            
        # 创建RSA密钥对象
        key = RSA.importKey(binascii.unhexlify(private_key))
        signer = PKCS1_v1_5.new(key)
        
        # 计算交易哈希
        transaction_hash = SHA256.new(json.dumps(self.to_dict(), sort_keys=True).encode())
        
        # 签名交易
        signature = signer.sign(transaction_hash)
        self.signature = binascii.hexlify(signature).decode('ascii')
        return True
    
    @staticmethod
    def verify_transaction(transaction):
        """
        验证交易签名
        
        :param transaction: 要验证的交易
        :return: 签名是否有效
        """
        # 系统奖励不需要验证
        if transaction.sender_address == "system":
            return True
            
        # 检查是否存在签名
        if not transaction.signature:
            print("没有签名!")
            return False
            
        # 创建RSA密钥对象
        try:
            public_key = RSA.importKey(binascii.unhexlify(transaction.sender_address))
            verifier = PKCS1_v1_5.new(public_key)
            
            # 计算交易哈希
            transaction_hash = SHA256.new(json.dumps(transaction.to_dict(), sort_keys=True).encode())
            
            # 验证签名
            return verifier.verify(transaction_hash, binascii.unhexlify(transaction.signature))
        except:
            print("验证交易失败")
            return False
