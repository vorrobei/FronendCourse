import { Component, Input } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-card-threat',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-threat.component.html',
  styleUrl: './card-threat.component.css'
})
export class CardThreatComponent {
  
  @Input() card: ICardThreat = {} as ICardThreat;        
}
