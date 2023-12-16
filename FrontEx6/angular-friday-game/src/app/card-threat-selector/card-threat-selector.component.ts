import { Component } from '@angular/core';
import { CardThreatComponent } from '../card-threat/card-threat.component';
import { ICardThreat } from '../cards/card.treat';
import { NgFor } from '@angular/common';
import { GameControllerService } from '../game-controller.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-threat-selector',
  standalone: true,
  imports: [NgFor, CardThreatComponent],
  templateUrl: './card-threat-selector.component.html',
  styleUrl: './card-threat-selector.component.css'
})
export class CardThreatSelectorComponent {  

  cards: Array<ICardThreat> = [];        

  constructor (private router: ActivatedRoute, private gameController: GameControllerService){}

  ngOnInit(): void {

    if(this.router.snapshot.paramMap.get('status') === 'new')
    {
      this.gameController.StartGame();      
    }  
    
    this.cards = this.gameController.NextTurn().threats;        
  }    

  onClick(card: ICardThreat): void {

    this.SendSelectedCardToGameController(card);
  }

  private SendSelectedCardToGameController(card: ICardThreat): void {

    let selectedID: number | undefined = this.cards.indexOf(card);

    if(selectedID !== undefined){
      this.cards.splice(selectedID, 1);
      this.gameController.SetSelectedThreatCard(card, this.cards);
    }
  }
}
