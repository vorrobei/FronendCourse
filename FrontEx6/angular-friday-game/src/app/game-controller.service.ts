import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICardThreat } from './cards/card.treat';
import { CardAbilityAction1xDestroy, ICardAbility } from './cards/card.ability';
import { CardDeck, ICardDeck } from './cards/card.deck';
import { ThreatCards } from './cards/card.threat.deck.mock';
import { Router } from '@angular/router';
import { AbilityCards } from './cards/card.ability.deck.mock';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  private threatDeck: ICardDeck<ICardThreat> = new CardDeck<ICardThreat>();

  private abilityDeck: ICardDeck<ICardAbility> = new CardDeck<ICardAbility>();  

  /*
  public drawThreatCard = new Subject<ICardThreat>();

  public drawAbilityCard = new Subject<ICardAbility>();
  */

  constructor(private router: Router) {
    this.threatDeck.cards = ThreatCards;
    this.threatDeck.Shuffle();

    this.abilityDeck.cards = AbilityCards.filter((card) => { card.id < 200 });
  }

  public drawThreatCards(count: number): Array<ICardThreat>{
    
    let res: Array<ICardThreat> = [];    

    for(let i = 0; i < count; i++){
      let card: ICardThreat | undefined = this.threatDeck.DrawCard();
      if(card !== undefined){
        res.push(card);
      }
    }

    return res;
  }

  public drawAbilityCard(): ICardAbility | undefined {
    return this.abilityDeck.DrawCard();
  }

  public setSelectedThreatCard(selectedCard: ICardThreat, unselected: Array<ICardThreat>): void{

    this.router.navigate(['/fightThreat', selectedCard.id.toString()]);

    console.log('GameControllerService: selected card = ' + selectedCard.id.toString());
    console.log('GameControllerService: unselected cards');
    console.log(unselected);
  }

  public onTest(): void {

    /*
    this.drawAbilityCard.next(
      { 
          id: 213, 
          name: 'realization', 
          abilityValue: 1, 
          ability: new CardAbilityAction1xDestroy(),
          discardCost: 1
      });
    */
  }
}
