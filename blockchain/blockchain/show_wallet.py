from wallet import Wallet

wallet = Wallet()
print(f"私钥: {wallet.get_private_key()}")
print(f"完整公钥(地址): {wallet.get_address()}")
print(f"前10个字符: {wallet.get_address()[:10]}")
print(f"前20个字符: {wallet.get_address()[:20]}")
print(f"前30个字符: {wallet.get_address()[:30]}") 