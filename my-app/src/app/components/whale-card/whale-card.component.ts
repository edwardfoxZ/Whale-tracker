import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whale-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whale-card.component.html',
  styleUrl: './whale-card.component.css',
})
export class WhaleCardComponent {
  @Input() whale: any;
}
