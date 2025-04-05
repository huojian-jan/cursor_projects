from Blockchain import Blockchain
from block import Block
from transaction import Transaction
from wallet import Wallet
import time

def main():
    # 创建区块链，降低难度以加快测试速度
    my_blockchain = Blockchain(2)
    
    # 创建一些钱包
    alice_wallet = Wallet()
    bob_wallet = Wallet()
    charlie_wallet = Wallet()
    
    print("\n=== 钱包信息 ===")
    print(f"Alice 地址: {alice_wallet.get_address()[:10]}...")
    print(f"Bob 地址: {bob_wallet.get_address()[:10]}...")
    print(f"Charlie 地址: {charlie_wallet.get_address()[:10]}...")
    
    print("\n=== 开始挖矿 ===")
    # 第一次挖矿，Alice获得奖励
    print("Alice正在挖矿...")
    my_blockchain.mine_pending_transactions(alice_wallet.get_address())
    
    # 创建一些交易
    print("\n=== 创建交易 ===")
    # Alice向Bob转账5个币
    tx1 = Transaction(alice_wallet.get_address(), bob_wallet.get_address(), 5)
    tx1.sign_transaction(alice_wallet.get_private_key())
    my_blockchain.add_transaction(tx1)
    print("Alice向Bob转账5个币")
    
    # Bob向Charlie转账2个币
    tx2 = Transaction(bob_wallet.get_address(), charlie_wallet.get_address(), 2)
    tx2.sign_transaction(bob_wallet.get_private_key())
    my_blockchain.add_transaction(tx2)
    print("Bob向Charlie转账2个币")
    
    # 第二次挖矿，Bob获得奖励
    print("\n=== Bob正在挖矿... ===")
    my_blockchain.mine_pending_transactions(bob_wallet.get_address())
    
    # 查看余额
    print("\n=== 当前余额 ===")
    print(f"Alice余额: {my_blockchain.get_balance_of_address(alice_wallet.get_address())}")
    print(f"Bob余额: {my_blockchain.get_balance_of_address(bob_wallet.get_address())}")
    print(f"Charlie余额: {my_blockchain.get_balance_of_address(charlie_wallet.get_address())}")
    
    # 尝试一个无效交易（Charlie没有足够的余额）
    print("\n=== 尝试无效交易 ===")
    tx3 = Transaction(charlie_wallet.get_address(), alice_wallet.get_address(), 10)
    tx3.sign_transaction(charlie_wallet.get_private_key())
    result = my_blockchain.add_transaction(tx3)
    print(f"交易是否成功: {result}")
    
    # 第三次挖矿，Charlie获得奖励
    print("\n=== Charlie正在挖矿... ===")
    my_blockchain.mine_pending_transactions(charlie_wallet.get_address())
    
    # 再次查看余额
    print("\n=== 最终余额 ===")
    print(f"Alice余额: {my_blockchain.get_balance_of_address(alice_wallet.get_address())}")
    print(f"Bob余额: {my_blockchain.get_balance_of_address(bob_wallet.get_address())}")
    print(f"Charlie余额: {my_blockchain.get_balance_of_address(charlie_wallet.get_address())}")
    
    # 验证区块链
    print(f"\n区块链是否有效: {my_blockchain.is_chain_valid()}")
    
    # 打印区块链
    print("\n区块链:")
    for block in my_blockchain.chain:
        print(block)
        print("-" * 50)

if __name__ == "__main__":
    main()
