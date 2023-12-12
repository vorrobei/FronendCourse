import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';
import { NgFor } from '@angular/common';
import { CardThreatComponent } from '../card-threat/card-threat.component';
import { ICardAbility } from '../cards/card.ability';
import { CardAbilityComponent } from '../card-ability/card-ability.component';

@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [NgFor, CardAbilityComponent],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.css'
})
export class CardsDisplayComponent {

  public cards: Array<ICardAbility> = new Array<ICardAbility>();

  constructor(private gameController: GameControllerService) {}

  ngOnInit(){
    /*
    this.gameController.drawAbilityCard.subscribe((card) => {
      this.cards.push(card);

      console.log('card draw');
      console.log(card);
    });
    */
  }

  ngOnDestroy(){
    // this.gameController.drawAbilityCard.unsubscribe();
  }

}
