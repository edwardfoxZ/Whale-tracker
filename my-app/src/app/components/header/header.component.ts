import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhaleCardComponent } from '../whale-card/whale-card.component';
import { WhaleTxCardComponent } from '../whale-tx-card/whale-tx-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, WhaleCardComponent, WhaleTxCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  whales = [
    {
      name: 'Ethereum Whale 1',
      wallet: '0x1234...abcd',
      balance: 1500,
      transactions: ['Bought 500 ETH', 'Sold 200 ETH', 'Staked 300 ETH'],
    },
    {
      name: 'Crypto Whale 2',
      wallet: '0x5678...efgh',
      balance: 2500,
      transactions: ['Transferred 1000 ETH', 'Received 700 ETH', 'Bought NFT'],
    },
    {
      name: 'Bitcoin Whale 3',
      wallet: '0x9abc...wxyz',
      balance: 3000,
      transactions: ['Swapped BTC for ETH', 'Moved funds to cold wallet'],
    },
  ];
}
