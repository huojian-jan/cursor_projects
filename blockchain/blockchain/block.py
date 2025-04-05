import hashlib
import time
import json


class Block:
    def __init__(self, index, timestamp, transactions, previous_hash, nonce=0):
        """
        初始化区块

        :param index: 区块索引
        :param timestamp: 区块创建时间戳
        :param transactions: 区块中的交易数据（Transaction对象列表）
        :param previous_hash: 前一个区块的哈希值
        :param nonce: 用于POW的随机数
        """
        self.index = index
        self.timestamp = timestamp
        self.transactions = transactions
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.calculate_hash()
    
    def calculate_hash(self):
        """
        计算区块的哈希值
        
        :return: 区块的哈希值
        """
        # 将交易对象转换为字典
        transaction_dicts = [tx.to_dict() if hasattr(tx, 'to_dict') else tx for tx in self.transactions]
        
        block_string = json.dumps({
            "index": self.index,
            "timestamp": self.timestamp,
            "transactions": transaction_dicts,
            "previous_hash": self.previous_hash,
            "nonce": self.nonce
        }, sort_keys=True).encode()
        
        return hashlib.sha256(block_string).hexdigest()
    
    def mine_block(self, difficulty):
        """
        挖矿方法 - 工作量证明算法
        找到一个哈希值，使其前difficulty位为0
        
        :param difficulty: 难度系数，表示哈希值前多少位必须为0
        """
        target = '0' * difficulty
        
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.calculate_hash()
            
        print(f"区块挖矿成功! 哈希: {self.hash}, 随机数: {self.nonce}")
    
    def __str__(self):
        """
        区块的字符串表示
        """
        # 格式化交易信息
        transaction_str = ""
        for i, tx in enumerate(self.transactions):
            transaction_str += f"  交易 #{i+1}:\n"
            if hasattr(tx, 'to_dict'):
                # Transaction对象
                transaction_str += f"    发送方: {tx.sender_address[:15]}...\n"
                transaction_str += f"    接收方: {tx.recipient_address[:15]}...\n"
                transaction_str += f"    金额: {tx.amount}\n"
                transaction_str += f"    时间戳: {tx.timestamp}\n"
            else:
                # 字典类型交易
                transaction_str += f"    发送方: {tx.get('from', 'unknown')}\n"
                transaction_str += f"    接收方: {tx.get('to', 'unknown')}\n"
                transaction_str += f"    金额: {tx.get('amount', 0)}\n"
            transaction_str += "    ----------\n"
        
        if not self.transactions:
            transaction_str = "  无交易\n"
        
        return (f"Block #{self.index}\n"
                f"Timestamp: {self.timestamp}\n"
                f"Transactions: {len(self.transactions)} transactions\n"
                f"{transaction_str}"
                f"Previous Hash: {self.previous_hash}\n"
                f"Nonce: {self.nonce}\n"
                f"Hash: {self.hash}\n")
