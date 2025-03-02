import { Injectable } from '@angular/core';
import { Contract, ethers, WebSocketProvider } from 'ethers';
import { BigNumber } from 'bignumber.js';
import { BehaviorSubject } from 'rxjs'; // For real-time data

@Injectable({
  providedIn: 'root',
})
export class WhaleTrackerService {
  private provider: WebSocketProvider;
  private contractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Example: USDC contract on Ethereum
  private contractAbi = [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' },
      ],
      name: 'Transfer',
      type: 'event',
    },
  ];
  private contract: Contract;
  private txThreshold: BigNumber = new BigNumber('100000000000000000000'); // 100 tokens in Wei
  private whaleTransactionSubject = new BehaviorSubject<any[]>([]); // Using BehaviorSubject to push updates to the component

  constructor() {
    // Use WebSocket provider (Infura or Alchemy)
    this.provider = new WebSocketProvider(
      'wss://mainnet.infura.io/ws/v3/YOUR_INFURA_PROJECT_ID'
    );
    this.contract = new Contract(
      this.contractAddress,
      this.contractAbi,
      this.provider
    );
    this.listenForTransfers();
  }

  // Real-time whale transaction listener
  private listenForTransfers() {
    this.contract.on(
      'Transfer',
      (from: string, to: string, value: ethers.BigNumberish) => {
        const transactionValue = new BigNumber(ethers.formatUnits(value, 18)); // Convert from Wei to Ether
        if (transactionValue.isGreaterThanOrEqualTo(this.txThreshold)) {
          console.log(`🐋 Whale Transaction detected!`);
          const whaleTransaction = {
            from,
            to,
            value: transactionValue.toString(),
          };
          this.whaleTransactionSubject.next([whaleTransaction]); // Push data to the subject
        }
      }
    );
  }

  // Fetch the latest whale transactions (called from the component)
  getWhaleTransactions() {
    return this.whaleTransactionSubject.asObservable(); // Return the observable so the component can subscribe to it
  }

  async getBalance(walletAddress: string) {
    // Get the balance of a wallet address
    const balance = await this.provider.getBalance(walletAddress);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
    return balance;
  }
}
