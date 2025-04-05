import argparse
import json
import requests
from wallet import Wallet

class BlockchainCLI:
    def __init__(self):
        self.parser = argparse.ArgumentParser(description='简易区块链CLI')
        self.setup_commands()
    
    def setup_commands(self):
        subparsers = self.parser.add_subparsers(dest='command', help='命令')
        
        # 创建钱包命令
        create_wallet_parser = subparsers.add_parser('create_wallet', help='创建新钱包')
        
        # 获取余额命令
        balance_parser = subparsers.add_parser('balance', help='查询地址余额')
        balance_parser.add_argument('address', type=str, help='要查询的地址')
        balance_parser.add_argument('--node', type=str, default='http://localhost:5000', help='节点地址')
        
        # 创建交易命令
        send_parser = subparsers.add_parser('send', help='发送交易')
        send_parser.add_argument('sender_private_key', type=str, help='发送方私钥')
        send_parser.add_argument('recipient_address', type=str, help='接收方地址')
        send_parser.add_argument('amount', type=float, help='转账金额')
        send_parser.add_argument('--node', type=str, default='http://localhost:5000', help='节点地址')
        
        # 挖矿命令
        mine_parser = subparsers.add_parser('mine', help='开始挖矿')
        mine_parser.add_argument('--node', type=str, default='http://localhost:5000', help='节点地址')
        
        # 查看区块链命令
        chain_parser = subparsers.add_parser('chain', help='查看区块链')
        chain_parser.add_argument('--node', type=str, default='http://localhost:5000', help='节点地址')
    
    def run(self):
        args = self.parser.parse_args()
        
        if args.command == 'create_wallet':
            self.create_wallet()
        elif args.command == 'balance':
            self.get_balance(args.address, args.node)
        elif args.command == 'send':
            self.send_transaction(args.sender_private_key, args.recipient_address, args.amount, args.node)
        elif args.command == 'mine':
            self.mine(args.node)
        elif args.command == 'chain':
            self.get_chain(args.node)
        else:
            self.parser.print_help()
    
    def create_wallet(self):
        """创建新钱包"""
        wallet = Wallet()
        print(f"私钥: {wallet.get_private_key()}")
        print(f"公钥(地址): {wallet.get_address()}")
    
    def get_balance(self, address, node_url):
        """查询地址余额"""
        try:
            response = requests.get(f"{node_url}/balance/{address}")
            data = response.json()
            print(f"地址: {address}")
            print(f"余额: {data['balance']}")
        except requests.exceptions.RequestException as e:
            print(f"错误: 无法连接到节点 {node_url}")
            print(e)
    
    def send_transaction(self, sender_private_key, recipient_address, amount, node_url):
        """发送交易"""
        from transaction import Transaction
        
        # 创建钱包从私钥
        wallet = Wallet()
        wallet.private_key = sender_private_key
        wallet.public_key = "derived_from_private_key"  # 在实际应用中应该从私钥派生
        
        # 创建并签名交易
        tx = Transaction(wallet.get_address(), recipient_address, amount)
        tx.sign_transaction(sender_private_key)
        
        # 发送到节点
        try:
            transaction_data = tx.to_dict()
            transaction_data['signature'] = tx.signature
            
            response = requests.post(
                f"{node_url}/transaction/new",
                json=transaction_data
            )
            
            if response.status_code == 201:
                print("交易已成功添加到区块中")
            else:
                print("交易无效")
        except requests.exceptions.RequestException as e:
            print(f"错误: 无法连接到节点 {node_url}")
            print(e)
    
    def mine(self, node_url):
        """开始挖矿"""
        try:
            response = requests.get(f"{node_url}/mine")
            data = response.json()
            print("挖矿结果:")
            print(f"消息: {data.get('message')}")
            print(f"区块索引: {data.get('block_index')}")
            print(f"区块哈希: {data.get('block_hash')}")
        except requests.exceptions.RequestException as e:
            print(f"错误: 无法连接到节点 {node_url}")
            print(e)
    
    def get_chain(self, node_url):
        """查看区块链"""
        try:
            response = requests.get(f"{node_url}/chain")
            data = response.json()
            print(f"区块链长度: {data.get('length')}")
            print("区块链:")
            for i, block in enumerate(data.get('chain', [])):
                print(f"\n区块 #{i}:")
                print(f"  时间戳: {block.get('timestamp')}")
                print(f"  交易数: {len(block.get('transactions', []))}")
                
                # 显示交易详情
                transactions = block.get('transactions', [])
                if transactions:
                    for j, tx in enumerate(transactions):
                        print(f"  交易 #{j+1}:")
                        if 'sender_address' in tx:
                            # Transaction对象格式
                            print(f"    发送方: {tx.get('sender_address')[:15]}...")
                            print(f"    接收方: {tx.get('recipient_address')[:15]}...")
                            print(f"    金额: {tx.get('amount')}")
                            print(f"    时间戳: {tx.get('timestamp')}")
                        else:
                            # 字典类型交易
                            print(f"    发送方: {tx.get('from', 'unknown')}")
                            print(f"    接收方: {tx.get('to', 'unknown')}")
                            print(f"    金额: {tx.get('amount', 0)}")
                        print("    ----------")
                else:
                    print("  无交易")
                
                print(f"  前一个哈希: {block.get('previous_hash')}")
                print(f"  哈希: {block.get('hash')}")
                print(f"  随机数: {block.get('nonce')}")
        except requests.exceptions.RequestException as e:
            print(f"错误: 无法连接到节点 {node_url}")
            print(e)

if __name__ == "__main__":
    cli = BlockchainCLI()
    cli.run()
