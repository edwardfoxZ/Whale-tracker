import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whale-tx-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whale-tx-card.component.html',
  styleUrl: './whale-tx-card.component.css',
})
export class WhaleTxCardComponent {
  @Input() tag!: string;
  @Input() txHash!: string;
  @Input() txOut!: string;
  @Input() txIn!: string;
}
