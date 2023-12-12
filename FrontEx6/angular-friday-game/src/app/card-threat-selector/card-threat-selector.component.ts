import { Component } from '@angular/core';
import { CardThreatComponent } from '../card-threat/card-threat.component';
import { ICardThreat } from '../cards/card.treat';
import { NgFor } from '@angular/common';
import { GameControllerService } from '../game-controller.service';

@Component({
  selector: 'app-card-threat-selector',
  standalone: true,
  imports: [NgFor, CardThreatComponent],
  templateUrl: './card-threat-selector.component.html',
  styleUrl: './card-threat-selector.component.css'
})
export class CardThreatSelectorComponent {

  private readonly cardCount: number = 2;

  cards: Array<ICardThreat> = [];        

  constructor (private gameController: GameControllerService){}

  ngOnInit(): void {
    this.cards = this.getThreatCardsForSelection();
  }    

  onClick(card: ICardThreat): void {
    this.sendSelectedCardToGameController(card);
  }

  private getThreatCardsForSelection(): Array<ICardThreat>{
    return this.gameController.drawThreatCards(this.cardCount);
  }

  private sendSelectedCardToGameController(card: ICardThreat): void {

    let selectedID: number | undefined = this.cards.indexOf(card);

    if(selectedID !== undefined){
      this.cards.splice(selectedID, 1);
      this.gameController.setSelectedThreatCard(card, this.cards);
    }
  }
}
