import { Component, Input } from '@angular/core';
import { CardAbilityAction1xDestroy, CardAbilityAdd2Life, ICardAbility } from '../cards/card.ability';

@Component({
  selector: 'app-card-ability',
  standalone: true,
  imports: [],
  templateUrl: './card-ability.component.html',
  styleUrl: './card-ability.component.css'
})
export class CardAbilityComponent {
  
  @Input() card: ICardAbility = {    
    id: 0, 
    name: 'unknown', 
    abilityValue: 0, 
    ability: null,
    discardCost: 1
  }
  
}
