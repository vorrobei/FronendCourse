import { Component } from '@angular/core';
import { CardAbilityAction1xDestroy, CardAbilityAdd2Life, ICardAbility } from '../cards/card.ability';

@Component({
  selector: 'app-card-ability',
  standalone: true,
  imports: [],
  templateUrl: './card-ability.component.html',
  styleUrl: './card-ability.component.css'
})
export class CardAbilityComponent {
  card: ICardAbility = {    
    id: 213, 
    name: 'realization', 
    abilityValue: 1, 
    ability: new CardAbilityAction1xDestroy(),
    discardCost: 1
  }
}
