import { Component } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';
import { GameControllerService } from '../game-controller.service';
import { NgFor } from '@angular/common';
import { CardThreatComponent } from '../card-threat/card-threat.component';

@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [NgFor, CardThreatComponent],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.css'
})
export class CardsDisplayComponent {

  public cards: Array<ICardThreat> = new Array<ICardThreat>();

  constructor(private gameController: GameControllerService) {}

  ngOnInit(){
    this.gameController.drawThreatCard.subscribe((card) => {
      this.cards.push(card);

      console.log('card draw');
      console.log(card);
    });
  }

  ngOnDestroy(){
    this.gameController.drawThreatCard.unsubscribe();
  }

}
