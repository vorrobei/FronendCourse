import { Injectable } from '@angular/core';
import { CardDeck, ICardDeck } from './cards/card.deck';
import { ICardThreat } from './cards/card.treat';
import { ICardAbility } from './cards/card.ability';
import { ThreatCards } from './cards/card.threat.deck.mock';
import { AbilityCards } from './cards/card.ability.deck.mock';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { PlayerDTO } from './game-domain/player-dto';
import { TurnResultDTO } from './game-domain/turn-result-dto';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private readonly threatCount: number = 2;

  // threat deck
  private threatDeck: ICardDeck<ICardThreat> = new CardDeck<ICardThreat>('Threat deck');  
  // player deck
  private playerDeck: ICardDeck<ICardAbility> = new CardDeck<ICardAbility>('Player deck');  
  // ability deck
  private abilityDeck: ICardDeck<ICardAbility> = new CardDeck<ICardAbility>('Ability deck');  
  // age deck
  private ageDeck: ICardDeck<ICardAbility> = new CardDeck<ICardAbility>('Age deck');  

  // player
  private player: PlayerDTO = new PlayerDTO(22, 20);
  // threatLevel
  private threatLevel: number = 1;

  constructor() { }

  public StartNewGame(): string {

    this.threatDeck.cards = ThreatCards;
    this.threatDeck.Shuffle();

    this.playerDeck.cards = AbilityCards.filter((card) => { return card.id < 200 });
    this.playerDeck.Shuffle();        

    this.abilityDeck.cards = AbilityCards.filter((card) => { return card.id >= 200 && card.id < 400 });     
    
    this.ageDeck.cards = AbilityCards.filter((card) => { return card.id >= 400 && card.id < 411 });     
    this.ageDeck.Shuffle();

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
        console.log('boss fight will be in next verions');
      }      
    }    

    // threats for next turn
    let threats: Array<ICardThreat> = [];    
    
    let threatCount = this.threatCount;
    if(this.threatDeck.cards.length < threatCount){
      threatCount = threatCount - this.threatDeck.cards.length;
    }

    for(let i = 0; i < threatCount; i++){      

      let card: ICardThreat | undefined = this.threatDeck.DrawCard();      

      if(card !== undefined){

        // set reward ability
        card.rewardCard = this.DrawAbilityCardByID(card.rewardCardID);

        console.log('draw threat card');
        console.log(card);

        threats.push(card);
      }    
    }    

    console.log('player deck');
    console.log(this.playerDeck);    
    console.log('threat deck');
    console.log(this.threatDeck);        

    return JSON.stringify(new NextTurnDTO(this.player, this.threatLevel, threats));
  }

  public DrawPlayerCard(): string {

    let card: ICardAbility | undefined = this.playerDeck.DrawCard();

    if(card === undefined){

      let ageCard: ICardAbility | undefined = this.ageDeck.DrawCard();
      if(ageCard !== undefined){
        this.playerDeck.DiscardCard(ageCard);
        console.log('ADD AGE CARD!');
        console.log(ageCard);
      }

      this.playerDeck.Shuffle();
      this.playerDeck.cards.forEach((card: ICardAbility) => {
        if(card.ability !== null) card.ability.isActivated = false;
      })

      card = this.playerDeck.DrawCard();
    }

    return JSON.stringify(card);
  }

  private DrawAbilityCardByID(cardID: number): ICardAbility | undefined {
    return this.abilityDeck.DrawCardByID(cardID);
  }

  public EndTurn(resultDTO: string): void {

    let turnResult: TurnResultDTO = JSON.parse(resultDTO) as TurnResultDTO;

    console.log('turn result');
    console.log(turnResult);    

    if(turnResult === undefined) return;

    for(let ability of turnResult.discardedAbility){
      this.playerDeck.DiscardCard(ability);
    }    

    for(let ability of turnResult.destroyedAbility){
      this.playerDeck.DestroyCard(ability);
    }

    for(let threat of turnResult.discardedThreat){      
      this.threatDeck.DiscardCard(threat);
    }        

    for(let threat of turnResult.destroyedThreat){      
      this.threatDeck.DestroyCard(threat);
    }    

    this.player.currentPlayerHP = turnResult.currentHP;

    console.log('player deck');
    console.log(this.playerDeck);    
    console.log('threat deck');
    console.log(this.threatDeck);     

  }
}
