import { Injectable } from '@angular/core';
import { CardDeck, ICardDeck } from './cards/card.deck';
import { ICardThreat } from './cards/card.treat';
import { ICardAbility } from './cards/card.ability';
import { ThreatCards } from './cards/card.threat.deck.mock';
import { AbilityCards } from './cards/card.ability.deck.mock';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { PlayerDTO } from './game-domain/player-dto';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private readonly threatCount: number = 2;

  // threat deck
  private threatDeck: ICardDeck<ICardThreat> = new CardDeck<ICardThreat>('Threat deck');  
  // ability deck
  private abilityDeck: ICardDeck<ICardAbility> = new CardDeck<ICardAbility>('Ability deck');  

  // player
  private player: PlayerDTO = new PlayerDTO(22, 20);
  // threatLevel
  private threatLevel: number = 1;

  constructor() { }

  public StartNewGame(): string {

    this.threatDeck.cards = ThreatCards;
    this.threatDeck.Shuffle();

    this.abilityDeck.cards = AbilityCards.filter((card) => { return card.id < 200 });
    this.abilityDeck.Shuffle();        

    this.threatLevel = 1;

    this.player = new PlayerDTO(22, 20);

    console.log('gamedata StartNewGame');

    return JSON.stringify(this.player);
  }
  
  public NextTurn(): string {    
    
    if(this.threatDeck.cards.length === 0){
      if(this.threatLevel < 3) {
        this.threatDeck.Shuffle();
        this.threatLevel++;
      }else{
        console.log('boss fight');
      }
    }    

    let threatCount = this.threatCount;

    let threats: Array<ICardThreat> = [];    

    if(this.threatDeck.cards.length === 1){
      threatCount = 1;
    }

    for(let i = 0; i < threatCount; i++){      

      let card: ICardThreat | undefined = this.threatDeck.DrawCard();      

      if(card !== undefined){

        console.log('draw threat card');
        console.log(card);

        threats.push(card);
      }    
    }    

    console.log('ability deck');
    console.log(this.abilityDeck);    
    console.log('threat deck');
    console.log(this.threatDeck);        

    return JSON.stringify(new NextTurnDTO(this.player, this.threatLevel, threats));
  }

  public DrawAbilityCard(): string {
    return JSON.stringify(this.abilityDeck.DrawCard());
  }

  public EndTurn(result: string): void {

  }
}
