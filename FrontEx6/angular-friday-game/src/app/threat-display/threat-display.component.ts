import { Component, Input } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';
import { CardThreatComponent } from '../card-threat/card-threat.component';
import { GameControllerService } from '../game-controller.service';

@Component({
  selector: 'app-threat-display',
  standalone: true,
  imports: [CardThreatComponent],
  templateUrl: './threat-display.component.html',
  styleUrl: './threat-display.component.css'
})
export class ThreatDisplayComponent {
  
  @Input() public threatCard: ICardThreat = {} as ICardThreat;

  constructor(private gameController: GameControllerService){}

  ngOnInit(): void {
        
    this.threatCard = this.gameController.currentThreatCard;  
  }
  
}
