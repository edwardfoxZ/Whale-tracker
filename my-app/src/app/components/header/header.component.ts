import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhaleCardComponent } from '../whale-card/whale-card.component';
import { WhaleTxCardComponent } from '../whale-tx-card/whale-tx-card.component';
import { WhaleTrackerService } from '../../services/whale-tracker.service';

interface Whale {
  name: string;
  wallet: string;
  balance: string;
  transactions: string[];
}

interface WhaleTransaction {
  from: string;
  to: string;
  value: string;
  hash: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, WhaleCardComponent, WhaleTxCardComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  whales: Whale[] = []; // ✅ Now defined
  whaleTransactions: WhaleTransaction[] = []; // ✅ Defined and initialized
  addressEtherScan: string | any = null;

  constructor(private whaleTrackerService: WhaleTrackerService) {}

  ngOnInit() {
    // Subscribe to whale transactions
    this.whaleTrackerService
      .getWhaleTransactions()
      .subscribe((transactions) => {
        this.whaleTransactions = [...transactions, ...this.whaleTransactions];
        this.addressEtherScan = transactions.map((tx) => tx.from);
        console.log(this.whaleTransactions); // Debugging output
      });

    // Simulating whales (replace with a real API call if needed)
    this.whales = [
      {
        name: 'Whale 1',
        wallet: '0x123...',
        balance: '2500',
        transactions: ['Tx1', 'Tx2', 'Tx3'],
      },
      {
        name: 'Whale 2',
        wallet: '0x456...',
        balance: '1500',
        transactions: ['Tx4', 'Tx5'],
      },
    ];
  }
}
