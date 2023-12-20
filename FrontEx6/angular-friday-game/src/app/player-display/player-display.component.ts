import { Component } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';
import { GameControllerService } from '../game-controller.service';

@Component({
  selector: 'app-player-display',
  standalone: true,
  imports: [],
  templateUrl: './player-display.component.html',
  styleUrl: './player-display.component.css'
})
export class PlayerDisplayComponent {
  
  constructor (public gameController: GameControllerService) {}
}
