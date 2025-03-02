import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhaleCardComponent } from '../whale-card/whale-card.component';
import { WhaleTxCardComponent } from '../whale-tx-card/whale-tx-card.component';
import { WhaleTrackerService } from '../../services/whale-tracker.service';

interface WhaleTransaction {
  from: string;
  to: string;
  value: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, WhaleCardComponent, WhaleTxCardComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  whaleTransactions: WhaleTransaction[] = []; // Initialize whale transactions array

  constructor(private whaleTrackerService: WhaleTrackerService) {}

  ngOnInit() {
    // Subscribe to the real-time whale transactions
    this.whaleTrackerService
      .getWhaleTransactions()
      .subscribe((transactions) => {
        this.whaleTransactions = transactions;
        console.log(this.whaleTransactions); // Logs whale transactions for debugging
      });
  }
}
