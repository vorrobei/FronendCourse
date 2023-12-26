import { Component, Input, SimpleChanges } from '@angular/core';
import { ICardAbility } from '../cards/card.ability';

@Component({
  selector: 'app-card-ability',
  standalone: true,
  imports: [],
  templateUrl: './card-ability.component.html',
  styleUrl: './card-ability.component.css'
})
export class CardAbilityComponent {
  
  @Input() card: ICardAbility | undefined = {    
    id: 0, 
    name: 'unknown', 
    abilityValue: 0, 
    ability: null,
    discardCost: 1
  }

  public ngOnChanges(changes: SimpleChanges) {
        
    this.OnChangeCard(changes['card'].currentValue);

    // You can also use changes['card'].previousValue and 
    // changes['card'].firstChange for comparing old and new values    
  }

  private OnChangeCard(card: ICardAbility | undefined){

  }

}
