import { Component, Input } from '@angular/core';
import { ICardAbility } from '../cards/card.ability';
import { ICardSelector } from '../cards/card.selector';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-ability-shadow',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card-ability-shadow.component.html',
  styleUrl: './card-ability-shadow.component.css'
})
export class CardAbilityShadowComponent {

  @Input() public card: ICardAbility = {} as ICardAbility;

  @Input() public selector: ICardSelector | null = {} as ICardSelector;  

  public onClick(): void {
    console.log('select card');
    console.log(this.card);

    this.selector?.SelectCard(this.card);

    console.log('selector cards');
    console.log(this.selector?.selected);
  }
}
