# 🖋️ WriteStamp — Decentralized Content Registration dApp

WriteStamp is a decentralized application that allows users to **register, verify, and retrieve the proof of ownership** for their written works or articles on the blockchain.  
It uses a **content hash** to store immutable proof of authorship without revealing the actual content.

---

## 🚀 Features
- **Content Registration**  
  Upload or paste your article text, along with a title and optional URI (link to hosted content). The dApp will:
  1. Generate a **SHA-256 hash** of your content.
  2. Store the hash and submission details on-chain.

- **Ownership Verification**  
  Check whether a content hash is already registered and see the associated author and timestamp.

- **Submissions History**  
  View all registered works by a specific address, including:
  - Content hashes
  - Author addresses
  - Registration timestamps

- **Wallet Authentication**  
  Integrated with **Origin SDK** for wallet-based login.

- **Wagmi Integration**  
  Blockchain read and write calls are powered by **Wagmi** hooks.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + Tailwind CSS + ShadCN UI
- **Blockchain Interaction:** Wagmi + Viem
- **Authentication:** Origin SDK
- **Smart Contract Language:** Solidity
- **Blockchain Network:** Basecamp Testnet

---

## 📦 Installation & Setup

### Prerequisites
- Node.js >= 18
- npm or yarn
- Metamask or any EVM-compatible wallet

### Clone the Repository
```bash
git clone https://github.com/yourusername/writestamp-dapp.git
cd writestamp-dapp
