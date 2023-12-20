import { Injectable, InjectionToken, inject } from '@angular/core';
import { ICardThreat } from './cards/card.treat';
import { Router } from '@angular/router';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { GameDataService } from './game-data.service';
import { PlayerDTO } from './game-domain/player-dto';
import { ABILITY_CODE, CardAbilityAdd2Life, ICardAbility, ICardAbilityAction } from './cards/card.ability';
import { TurnResultDTO } from './game-domain/turn-result-dto';
import { Subject } from 'rxjs';
import { DestroyedCardSelector, ICardSelector } from './cards/card.selector';

export enum GAMEMODE {
  NONE = 0,
  GAME_START = 1,
  THREAT_SELECTION = 2,
  FIGHT = 3,
  DISCARD_CARDS = 4,
  END_TURN = 5,
}

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  public mode: Subject<GAMEMODE> = new Subject<GAMEMODE>();

  // player info
  public player: PlayerDTO = new PlayerDTO(0, 0)
  // turn info
  public turn: NextTurnDTO = new NextTurnDTO(this.player, 1, []);  

  // threat level
  public currentThreatLevel: number = 1;  
  // threat card selected for turn
  public currentThreatCard: ICardThreat = {} as ICardThreat;

  // free cards counter  
  public freeCardsCounter: number = 0;
  // current set of ability cards
  public abilityCards: Array<ICardAbility> = new Array<ICardAbility>();
  // current set of actions
  public actions: Array<ICardAbilityAction> = new Array<ICardAbilityAction>();

  // current score to fight threat
  public currentScores: number = 0;
  //
  public scoresDelta: number = 0;

  // selector for select card for destroy at the end of turn
  public destroyedSelector: ICardSelector = new DestroyedCardSelector(0);
  
  constructor(private router: Router, private gameData: GameDataService) {}

  // start new game
  public StartGame(): PlayerDTO {

    this.mode.next(GAMEMODE.GAME_START);

    this.player = JSON.parse(this.gameData.StartNewGame()) as PlayerDTO;
    return this.player;    
  }

  // return data for next turn
  public NextTurn(): NextTurnDTO {

    this.mode.next(GAMEMODE.THREAT_SELECTION);
    console.log('mode: next turn');
  
    this.router.navigate(['/turn/next']);

    this.turn = JSON.parse(this.gameData.NextTurn()) as NextTurnDTO;    
    return this.turn;
  }

  public SetSelectedThreatCard(selectedCard: ICardThreat, unselected: Array<ICardThreat>): void{
    
    this.mode.next(GAMEMODE.FIGHT);
    console.log('mode: fight start');

    this.currentThreatCard = selectedCard;

    this.abilityCards = [];

    this.freeCardsCounter = this.currentThreatCard.freeCards;        
    this.currentScores = 0;

    this.router.navigate(['/fightThreat']);

    // this.router.navigate(['/fightThreat', selectedCard.id.toString()]);
  }  

  public DrawAbilityCard(): ICardAbility {

    if(this.freeCardsCounter > 0){
      this.freeCardsCounter--;
      console.log('draw ability card for free');
    }else{      
      this.player.currentPlayerHP--;
      console.log('draw ability card for spending HP');
    }

    let abilityCard = JSON.parse(this.gameData.DrawAbilityCard(), (key, value) => {
      if(key === 'ability' && value !== null){
        switch (value.code) {
          case ABILITY_CODE.ADD2LIVES:            
            value = Object.assign(new CardAbilityAdd2Life(), value);
            break;        
          default:
            break;
        }
      }       
      return value;
    }) as ICardAbility;

    this.abilityCards.push(abilityCard);    

    this.currentScores += abilityCard.abilityValue;
    this.scoresDelta = this.currentThreatCard.levelValues[this.currentThreatLevel] - this.currentScores;

    if(abilityCard.ability !== null){
      this.actions.push(abilityCard.ability);
    }

    console.log(abilityCard);

    return abilityCard;
  }

  public EndFight(){
    this.mode.next(GAMEMODE.DISCARD_CARDS);
    console.log('mode: discard card');
  }

  public EndTurn(): TurnResultDTO{

    this.mode.next(GAMEMODE.END_TURN);
    console.log('mode: end turn');

    console.log('destroyes cards');
    console.log(this.destroyedSelector.selected);    

    let res = new TurnResultDTO();

    res.isSuccess = this.currentScores >= this.currentThreatCard.levelValues[this.currentThreatLevel - 1];
    res.currentHP = this.player.currentPlayerHP;         

    res.rewardedAbility = new Array<ICardAbility>();
    res.discardedAbility = new Array<ICardAbility>();
    res.destroyedAbility = new Array<ICardAbility>();
    res.discardedThreat = new Array<ICardThreat>();
    res.destroyedThreat = new Array<ICardThreat>();    

    console.log('turn result');
    console.log(res);

    this.gameData.EndTurn(JSON.stringify(res));

    this.NextTurn();

    return res;
  }

  public GetCardSelector(): ICardSelector {
    this.destroyedSelector.Init(2);
    return this.destroyedSelector;
  }

  public onDraw(): void {
    this.DrawAbilityCard();
  }

  public onEndFight(){
    this.EndFight();
  }  

  public onEndTurn(){
    this.EndTurn();
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
