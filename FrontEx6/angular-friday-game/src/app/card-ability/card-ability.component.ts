import { Component } from '@angular/core';
import { ICardAbility } from '../cards/card.ability';

@Component({
  selector: 'app-card-ability',
  standalone: true,
  imports: [],
  templateUrl: './card-ability.component.html',
  styleUrl: './card-ability.component.css'
})
export class CardAbilityComponent {
  card: ICardAbility = {    
    id: 101, 
    name: 'distracted', 
    abilityValue: -1, 
    ability: null,
    discardCost: 1
  }
}
