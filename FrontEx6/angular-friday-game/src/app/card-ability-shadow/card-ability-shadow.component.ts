import { Component, Input } from '@angular/core';
import { ICardAbility } from '../cards/card.ability';
import { ICardSelector } from '../cards/card.selector';
import { NgClass, NgIf } from '@angular/common';
import { CardAbilityContainer } from '../game-controller.service';

@Component({
  selector: 'app-card-ability-shadow',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './card-ability-shadow.component.html',
  styleUrl: './card-ability-shadow.component.css'
})
export class CardAbilityShadowComponent {

  @Input() public card: CardAbilityContainer | undefined = undefined;

  @Input() public selector: ICardSelector | undefined = undefined;  

  public onClick(): void {

    console.log('select card');
    console.log(this.card);

    if(this.selector !== undefined && this.card !== undefined){
      this.selector?.SelectCard(this.card);
    }
  }
}
