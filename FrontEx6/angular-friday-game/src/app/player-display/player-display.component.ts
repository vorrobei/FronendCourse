import { Component } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';

@Component({
  selector: 'app-player-display',
  standalone: true,
  imports: [],
  templateUrl: './player-display.component.html',
  styleUrl: './player-display.component.css'
})
export class PlayerDisplayComponent {
  
  threatCard: ICardThreat = { 
    id: 310, 
    name: 'with the raft to the wreck', 
    freeCards: 1, 
    levelValues: [0, 1, 3], 
    revardCardID: 210,
  };

}
