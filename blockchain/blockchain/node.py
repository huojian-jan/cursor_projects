import json
import requests
from flask import Flask, request, jsonify
from Blockchain import Blockchain
from transaction import Transaction
from wallet import Wallet
import threading

class Node:
    def __init__(self, port):
        """
        初始化节点
        
        :param port: 节点监听的端口
        """
        self.port = port
        self.app = Flask(__name__)
        self.blockchain = Blockchain(4)  # 创建区块链，难度为4
        self.wallet = Wallet()  # 为节点创建钱包
        self.peers = set()  # 其他节点的地址集合
        
        # 配置API路由
        self.configure_routes()
    
    def configure_routes(self):
        """配置API路由"""
        
        @self.app.route('/chain', methods=['GET'])
        def get_chain():
            chain_data = []
            for block in self.blockchain.chain:
                # 将交易对象转换为字典
                tx_data = []
                for tx in block.transactions:
                    if hasattr(tx, 'to_dict'):
                        # Transaction对象
                        tx_dict = tx.to_dict()
                        tx_dict['signature'] = tx.signature  # 添加签名信息
                        tx_data.append(tx_dict)
                    else:
                        # 已经是字典的交易
                        tx_data.append(tx)
                
                block_data = {
                    'index': block.index,
                    'timestamp': block.timestamp,
                    'transactions': tx_data,
                    'previous_hash': block.previous_hash,
                    'nonce': block.nonce,
                    'hash': block.hash
                }
                chain_data.append(block_data)
            
            return jsonify({
                'length': len(self.blockchain.chain),
                'chain': chain_data
            })
        
        @self.app.route('/transaction/new', methods=['POST'])
        def new_transaction():
            values = request.get_json()
            
            required = ['sender_address', 'recipient_address', 'amount', 'signature']
            if not all(k in values for k in required):
                return jsonify({'message': '缺少参数'}), 400
            
            transaction = Transaction(
                values['sender_address'],
                values['recipient_address'],
                values['amount']
            )
            transaction.signature = values['signature']
            
            # 添加交易到区块链
            success = self.blockchain.add_transaction(transaction)
            
            if success:
                # 广播交易到其他节点
                self.broadcast_transaction(transaction)
                return jsonify({'message': '交易将被添加到区块中'}), 201
            else:
                return jsonify({'message': '交易无效'}), 400
        
        @self.app.route('/mine', methods=['GET'])
        def mine():
            # 挖矿处理待处理交易
            block = self.blockchain.mine_pending_transactions(self.wallet.get_address())
            
            # 广播新区块到其他节点
            self.broadcast_block(block)
            
            return jsonify({
                'message': '新区块已挖掘',
                'block_index': block.index,
                'block_hash': block.hash
            })
        
        @self.app.route('/nodes/register', methods=['POST'])
        def register_nodes():
            values = request.get_json()
            nodes = values.get('nodes')
            
            if nodes is None:
                return jsonify({'message': '错误: 请提供有效的节点列表'}), 400
            
            for node in nodes:
                self.peers.add(node)
            
            return jsonify({
                'message': '新节点已添加',
                'total_nodes': list(self.peers)
            })
        
        @self.app.route('/nodes/resolve', methods=['GET'])
        def consensus():
            replaced = self.resolve_conflicts()
            
            if replaced:
                return jsonify({
                    'message': '我们的链被取代',
                    'new_chain': [block.__dict__ for block in self.blockchain.chain]
                })
            else:
                return jsonify({
                    'message': '我们的链是权威的',
                    'chain': [block.__dict__ for block in self.blockchain.chain]
                })
        
        @self.app.route('/balance/<address>', methods=['GET'])
        def get_balance(address):
            balance = self.blockchain.get_balance_of_address(address)
            return jsonify({'address': address, 'balance': balance})
    
    def run(self):
        """启动节点"""
        threading.Thread(target=self.app.run, kwargs={'host': '0.0.0.0', 'port': self.port}).start()
        print(f"节点运行在 http://localhost:{self.port}")
    
    def broadcast_transaction(self, transaction):
        """
        广播交易到所有对等节点
        
        :param transaction: 要广播的交易
        """
        transaction_dict = transaction.to_dict()
        transaction_dict['signature'] = transaction.signature
        
        for peer in self.peers:
            url = f"http://{peer}/transaction/new"
            try:
                requests.post(url, json=transaction_dict)
            except:
                print(f"无法连接到节点 {peer}")
    
    def broadcast_block(self, block):
        """
        广播新区块到所有对等节点
        
        :param block: 要广播的区块
        """
        block_dict = {
            'index': block.index,
            'timestamp': block.timestamp,
            'transactions': [tx.to_dict() if hasattr(tx, 'to_dict') else tx for tx in block.transactions],
            'previous_hash': block.previous_hash,
            'nonce': block.nonce,
            'hash': block.hash
        }
        
        for peer in self.peers:
            url = f"http://{peer}/block/receive"
            try:
                requests.post(url, json=block_dict)
            except:
                print(f"无法连接到节点 {peer}")
    
    def resolve_conflicts(self):
        """
        共识算法，解决冲突
        通过用网络中最长的链取代我们的链
        
        :return: 如果我们的链被取代，返回True，否则返回False
        """
        new_chain = None
        max_length = len(self.blockchain.chain)
        
        # 获取所有节点的链并检查有效性和长度
        for peer in self.peers:
            url = f"http://{peer}/chain"
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    length = data['length']
                    chain = data['chain']
                    
                    # 检查长度和有效性
                    if length > max_length and self.validate_chain(chain):
                        max_length = length
                        new_chain = chain
            except:
                continue
        
        # 如果找到一个更长更有效的链，替换我们的链
        if new_chain:
            self.replace_chain(new_chain)
            return True
        
        return False
    
    def validate_chain(self, chain):
        """
        验证给定的链是否有效
        
        :param chain: 从其他节点获取的链
        :return: 链是否有效
        """
        # 简化的验证逻辑
        return True  # 在实际应用中需要详细验证
    
    def replace_chain(self, chain):
        """
        用给定的链替换我们的链
        
        :param chain: 从其他节点获取的链
        """
        # 简化的替换逻辑
        self.blockchain.chain = chain

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    else:
        port = 5000
    
    node = Node(port)
    node.run()
    
    print(f"\n节点钱包地址: {node.wallet.get_address()[:10]}...")
    print("节点已启动，您可以使用以下API:")
    print(f"- 查看区块链: http://localhost:{port}/chain")
    print(f"- 挖矿: http://localhost:{port}/mine")
    print(f"- 查看余额: http://localhost:{port}/balance/<address>")
    
    # 保持程序运行
    try:
        while True:
            cmd = input("\n输入命令 (exit 退出): ")
            if cmd.lower() == 'exit':
                break
    except KeyboardInterrupt:
        print("节点已停止")
