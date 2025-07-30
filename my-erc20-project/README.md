# My ERC20 Token Project

Dự án này triển khai một ERC20 token với các tính năng nâng cao sử dụng Hardhat và OpenZeppelin.

## Tính năng

- **ERC20 Token chuẩn** với OpenZeppelin
- **Mint/Burn tokens** (chỉ admin)
- **Reverse Transfer** - hoàn lại giao dịch sai
- **Pause/Unpause** - tạm dừng tất cả giao dịch
- **Admin controls** - quản lý quyền hạn

## Contract đã deploy

**Network**: Ethermint (Chain ID: 9000)
**Contract Address**: `0x8603791faf651dbE54e382A1866F3Ec9697eC0c1`

## Cách sử dụng

### 1. Cài đặt dependencies
```shell
npm install
```

### 2. Compile contracts
```shell
npx hardhat compile
```

### 3. Chạy tests
```shell
npx hardhat test
REPORT_GAS=true npx hardhat test
```

### 4. Deploy contract

#### Khởi động local network
```shell
npx hardhat node --port 9545
```

#### Deploy contract
```shell
npx hardhat ignition deploy ./ignition/modules/MyERC20Token.js --network localhost
```

### 5. Tương tác với contract

Sử dụng Hardhat console để tương tác:
```shell
npx hardhat console --network localhost
```

Ví dụ tương tác:
```javascript
// Lấy contract instance
const token = await ethers.getContractAt("MyERC20Token", "0xA665B00787Fc02b181E0370C15Fd681Af5bb2B60");

// Kiểm tra balance
await token.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

// Mint tokens (chỉ owner)
await token.mint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", ethers.utils.parseEther("1000"));

// Transfer tokens
await token.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", ethers.utils.parseEther("100"));
```

## Accounts mặc định (Local Network)

**Owner Account**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
**Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

⚠️ **Cảnh báo**: Các private key này được công khai. Không bao giờ sử dụng trên mainnet!

## Cấu trúc dự án

```
my-erc20-project/
├── contracts/
│   └── MyERC20Token.sol      # Smart contract chính
├── ignition/
│   └── modules/
│       └── MyERC20Token.js   # Deploy script
├── test/
│   └── MyERC20Token.js       # Test cases
├── hardhat.config.js         # Cấu hình Hardhat
└── README.md
```

## Admin Functions

- `mint(address to, uint256 amount)` - Tạo token mới
- `burnFrom(address account, uint256 amount)` - Đốt token
- `reverseTransfer(bytes32 txHash, address from, address to, uint256 amount)` - Hoàn lại giao dịch
- `pause()` / `unpause()` - Tạm dừng/tiếp tục contract
- `emergencyWithdraw()` - Rút ETH khẩn cấp
