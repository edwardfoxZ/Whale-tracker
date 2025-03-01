import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WhaleCardComponent } from '../whale-card/whale-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, WhaleCardComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  whaleData = [
    { tag: '0x0123', eth: '3.2 ETH', usd: '$5,000' },
    { tag: '0x0456', eth: '1.5 ETH', usd: '$2,300' },
    { tag: '0x0789', eth: '5.1 ETH', usd: '$8,900' },
    { tag: '0x0999', eth: '0.8 ETH', usd: '$1,200' },
  ];
}
