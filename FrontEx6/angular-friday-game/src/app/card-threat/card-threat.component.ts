import { Component, Input, SimpleChanges } from '@angular/core';
import { ICardThreat } from '../cards/card.treat';
import { NgFor } from '@angular/common';
import { GameControllerService } from '../game-controller.service';
import { CardAbilityComponent } from '../card-ability/card-ability.component';

@Component({
  selector: 'app-card-threat',
  standalone: true,
  imports: [NgFor, CardAbilityComponent],
  templateUrl: './card-threat.component.html',
  styleUrl: './card-threat.component.css'
})
export class CardThreatComponent {
  
  @Input() card: ICardThreat = {} as ICardThreat;        

  constructor (public gameController: GameControllerService) {}

  ngOnChanges(changes: SimpleChanges) {
        
    this.OnChangeCard(changes['card'].currentValue);

    // You can also use changes['card'].previousValue and 
    // changes['card'].firstChange for comparing old and new values    
  }

  public OnChangeCard(card: ICardThreat){    
  }

}
