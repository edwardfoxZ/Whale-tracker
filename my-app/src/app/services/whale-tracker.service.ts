import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs'; // For real-time data
import { BigNumber } from 'bignumber.js';

@Injectable({
  providedIn: 'root',
})
export class WhaleTrackerService {
  private provider: ethers.WebSocketProvider;
  private contract: ethers.Contract;
  private contractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Example: USDC contract
  private txThreshold: BigNumber = new BigNumber('100000000'); // 100,000,000 USDC
  private whaleTransactionSubject = new BehaviorSubject<any[]>([]); // Store transactions

  private contractAbi = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
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

  constructor() {
    // ✅ Use Alchemy WebSocket Provider
    this.provider = new ethers.WebSocketProvider(
      'wss://eth-mainnet.g.alchemy.com/v2/_VYJr429SAz5baxliNvyx-zGMEyq5nGg'
    );

    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractAbi,
      this.provider
    );

    this.listenForTransfers();
  }

  // ✅ Real-time whale transaction listener
  private listenForTransfers() {
    this.contract.on(
      'Transfer',
      (from: string, to: string, value: ethers.BigNumberish, hash: string) => {
        const transactionValue = new BigNumber(
          ethers.formatUnits(value, 6) // USDC has 6 decimals
        );

        if (transactionValue.isGreaterThanOrEqualTo(this.txThreshold)) {
          console.log(`🐋 Whale Transaction detected!`);
          const whaleTransaction = {
            from,
            to,
            value: transactionValue.toString(),
            hash,
          };

          // ✅ Append new transactions instead of overwriting
          const currentTxs = this.whaleTransactionSubject.getValue();
          this.whaleTransactionSubject.next([...currentTxs, whaleTransaction]);
        }
      }
    );
  }

  // ✅ Fetch real-time transactions
  getWhaleTransactions() {
    return this.whaleTransactionSubject.asObservable();
  }

  // ✅ Get balance of a wallet
  async getBalance(walletAddress: string) {
    const balance = await this.provider.getBalance(walletAddress);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
    return balance;
  }
}
