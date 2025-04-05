from block import Block
from transaction import Transaction
import time

class Blockchain:
    def __init__(self, difficulty=4):
        """
        初始化区块链
        
        :param difficulty: 工作量证明的难度系数
        """
        self.chain = []
        self.difficulty = difficulty
        self.pending_transactions = []  # 待处理的交易
        self.mining_reward = 10  # 挖矿奖励
        self.create_genesis_block()
    
    def create_genesis_block(self):
        """
        创建创世区块（区块链的第一个区块）
        """
        genesis_block = Block(0, time.time(), [], "0")
        genesis_block.mine_block(self.difficulty)
        self.chain.append(genesis_block)
        return genesis_block
    
    def get_latest_block(self):
        """获取最新的区块"""
        return self.chain[-1]
    
    def mine_pending_transactions(self, mining_reward_address):
        """
        挖掘所有待处理的交易并将其添加到区块中
        
        :param mining_reward_address: 接收挖矿奖励的地址
        """
        # 创建挖矿奖励交易
        reward_tx = Transaction("system", mining_reward_address, self.mining_reward)
        self.pending_transactions.append(reward_tx)
        
        # 创建新区块
        block = Block(
            len(self.chain),
            time.time(),
            self.pending_transactions,
            self.get_latest_block().hash
        )
        
        # 挖矿（工作量证明）
        block.mine_block(self.difficulty)
        
        # 将区块添加到区块链
        self.chain.append(block)
        
        # 重置待处理交易列表
        self.pending_transactions = []
        
        return block
    
    def create_transaction(self, transaction):
        """
        创建一个新的交易
        
        :param transaction: 交易数据，包含发送方、接收方和金额
        """
        self.pending_transactions.append(transaction)
    
    def add_transaction(self, transaction):
        """
        添加交易到待处理列表
        
        :param transaction: 交易对象
        :return: 添加是否成功
        """
        # 验证交易签名
        if not Transaction.verify_transaction(transaction):
            print("交易签名无效，拒绝添加交易")
            return False
        
        # 验证余额是否足够
        if transaction.sender_address != "system":  # 系统奖励不需要验证余额
            sender_balance = self.get_balance_of_address(transaction.sender_address)
            if sender_balance < transaction.amount:
                print(f"余额不足! 当前余额: {sender_balance}, 交易金额: {transaction.amount}")
                return False
        
        # 添加交易到待处理列表
        self.pending_transactions.append(transaction)
        return True
    
    def get_balance_of_address(self, address):
        """
        获取某个地址的余额
        
        :param address: 要查询的地址（全部或部分地址）
        :return: 该地址的余额
        """
        balance = 0
        
        # 支持部分地址匹配
        is_partial = len(address) < 50  # 假设完整地址长度超过50
        
        # 遍历所有区块
        for block in self.chain:
            # 遍历区块中的所有交易
            for transaction in block.transactions:
                # 判断交易类型
                if isinstance(transaction, dict):
                    # 字典类型交易
                    sender = transaction.get("from", "")
                    recipient = transaction.get("to", "")
                    
                    if (is_partial and sender and sender.startswith(address)) or sender == address:
                        balance -= transaction.get("amount", 0)
                    if (is_partial and recipient and recipient.startswith(address)) or recipient == address:
                        balance += transaction.get("amount", 0)
                elif hasattr(transaction, 'sender_address') and hasattr(transaction, 'recipient_address'):
                    # Transaction对象
                    sender = transaction.sender_address
                    recipient = transaction.recipient_address
                    
                    if (is_partial and sender and sender.startswith(address)) or sender == address:
                        balance -= transaction.amount
                    if (is_partial and recipient and recipient.startswith(address)) or recipient == address:
                        balance += transaction.amount
        
        return balance
    
    def is_chain_valid(self):
        """
        验证区块链的有效性
        
        :return: 区块链是否有效
        """
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i-1]
            
            # 验证当前区块的哈希是否正确
            if current_block.hash != current_block.calculate_hash():
                return False
            
            # 验证当前区块的previous_hash是否指向前一个区块的哈希
            if current_block.previous_hash != previous_block.hash:
                return False
            
            # 验证哈希是否满足难度要求（工作量证明）
            if current_block.hash[:self.difficulty] != '0' * self.difficulty:
                return False
        
        return True