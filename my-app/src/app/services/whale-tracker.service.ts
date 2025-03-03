import { Injectable } from '@angular/core';
import { ethers, JsonRpcProvider } from 'ethers';
import { BehaviorSubject } from 'rxjs'; // For real-time data
import { BigNumber } from 'bignumber.js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhaleTrackerService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private contractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC contract
  private txThreshold: BigNumber = new BigNumber('100000'); // 100,000 USDC default
  private whaleTransactionSubject = new BehaviorSubject<any[]>([]); // Store transactions
  private processedTxHashes = new Set<string>(); // Track processed tx hashes to avoid duplicates

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
    this.provider = new JsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/_VYJr429SAz5baxliNvyx-zGMEyq5nGg'
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
      (from: string, to: string, value: ethers.BigNumberish, event: any) => {
        const transactionValue = new BigNumber(
          ethers.formatUnits(value, 6) // USDC has 6 decimals
        );
        const txHash = event?.log?.transactionHash;

        // Avoid reprocessing the same transaction if already processed
        if (this.processedTxHashes.has(txHash)) {
          console.log(`Duplicate transaction detected: ${txHash}`);
          return; // Ignore duplicate tx
        }

        // Mark the transaction hash as processed
        this.processedTxHashes.add(txHash);

        if (transactionValue.isGreaterThanOrEqualTo(this.txThreshold)) {
          console.log(`🐋 Whale Transaction detected!`);
          const whaleTransaction = {
            from,
            to,
            value: transactionValue.toString(),
            hash: txHash,
          };

          // ✅ Append new transactions instead of overwriting
          const currentTxs = this.whaleTransactionSubject.getValue();
          this.whaleTransactionSubject.next([...currentTxs, whaleTransaction]);

          // ✅ Play the "ding" sound after each whale transaction
          this.playDingSound();
        }
      }
    );
  }

  setFilter(amount: string) {
    this.txThreshold = new BigNumber(amount ? amount : this.txThreshold);
    console.log('New Threshold Set: ', this.txThreshold.toString());
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

  // ✅ Function to play "ding" sound
  private playDingSound(): void {
    const audio = new Audio('assets/ding.mp3'); // Correct path to the ding sound
    audio
      .play()
      .catch((err) => console.error('Error playing ding sound:', err));
  }
}
