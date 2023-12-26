import { Injectable, InjectionToken, inject } from '@angular/core';
import { ICardThreat } from './cards/card.treat';
import { Router } from '@angular/router';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { GameDataService } from './game-data.service';
import { PlayerDTO } from './game-domain/player-dto';
import { ABILITY_CODE, CardAbilityActionAddCards, CardAbilityActionChangeLife, CardAbilityActionPhaseLess, ICardAbility, ICardAbilityAction } from './cards/card.ability';
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

/*
export class FigthDTO {

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
  // score for destroying cards
  public destoyPoints: number = 0;  
  
}
*/

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
  // reward ability for turn
  public currentRewardCard: ICardAbility | undefined = {} as ICardAbility;
  // free cards counter  
  public freeCardsCounter: number = 0;
  // additional free cards counter  
  public extraCardsCounter: number = 0;  

  // current set of ability cards
  public abilityCards: Array<ICardAbility> = new Array<ICardAbility>();
  // current set of actions
  public actions: Array<ICardAbilityAction> = new Array<ICardAbilityAction>();

  // current score to fight threat
  public currentScores: number = 0;
  // score for destroying cards
  public destoyPoints: number = 0;

  // selector for select card for destroy at the end of turn
  public destroyedSelector: ICardSelector = new DestroyedCardSelector(0);
  
  constructor(private router: Router, private gameData: GameDataService) {}

  // return data for next turn
  public NextTurn(isNewGame: boolean = false): NextTurnDTO {

    // new game
    if(isNewGame){
      this.mode.next(GAMEMODE.GAME_START);
      console.log('mode: start game');      
  
      this.player = JSON.parse(this.gameData.StartNewGame()) as PlayerDTO;
    }    

    // next turn
    this.mode.next(GAMEMODE.THREAT_SELECTION);
    console.log('mode: next turn');    
  
    // setup interface for threat selection
    this.router.navigate(['/turn/next']);

    // setup threat level and player params from data source
    this.turn = JSON.parse(this.gameData.NextTurn()) as NextTurnDTO;   
    this.currentThreatLevel = this.turn.threatLevel;
    this.player = this.turn.player;    
    
    return this.turn;
  }

  // set threat card for turn and start fight
  public SetSelectedThreatCard(selectedCard: ICardThreat): void{
    
    this.mode.next(GAMEMODE.FIGHT);
    console.log('mode: fight start');
    
    this.currentThreatCard = selectedCard;  
    this.currentRewardCard = this.currentThreatCard.rewardCard;
    this.abilityCards = [];
    this.actions = [];
    this.freeCardsCounter = this.currentThreatCard.freeCards;        
    this.extraCardsCounter = 0;
    this.currentScores = 0;
    this.destoyPoints = 0;

    console.log('game state');
    console.log(this);

    this.router.navigate(['/fightThreat']);
  }  

  // draw card from player deck
  public DrawAbilityCard(isExtraDraw: boolean = false): ICardAbility | undefined {

    if(isExtraDraw){

      if(this.extraCardsCounter > 0){    

        this.extraCardsCounter--;                
        console.log('draw extra ability card for free');        
      }else{        

        console.log('no extra cards available');
        return undefined;
      }
    }else{

      // free card or card for hp
      if(this.freeCardsCounter > 0){

        this.freeCardsCounter--;      
        console.log('draw ability card for free');
      }else{      

        this.player.currentPlayerHP--;
        console.log('draw ability card for spending HP');
      }
    }

    // draw card from player deck
    let abilityCard: ICardAbility | undefined = this.RestoreAbilityCardFromDTO(this.gameData.DrawPlayerCard());
    if(abilityCard !== undefined){

      this.abilityCards.push(abilityCard);    
      this.currentScores += abilityCard.abilityValue;
      
      if(abilityCard.ability !== null){
        this.actions.push(abilityCard.ability);
      }

      this.destoyPoints = this.currentThreatCard.levelValues[this.currentThreatLevel - 1] - this.currentScores;
      console.log(abilityCard);
  
      return abilityCard;  
    }
    
    console.log('can\'t draw card from player deck');

    return undefined;
  }

  public EndFight(){

    console.log('game state');
    console.log(this);

    // check win or lose
    if(this.destoyPoints > 0){
      
      console.log('lose fight');

      this.mode.next(GAMEMODE.DISCARD_CARDS);        
      console.log('mode: discard card');

    }else{

      console.log('win fight');

      this.EndTurn();
    }
  }

  public EndTurn(): TurnResultDTO{

    this.mode.next(GAMEMODE.END_TURN);

    console.log('mode: end turn');

    console.log('destroyed cards');
    console.log(this.destroyedSelector.selected);    

    let res = new TurnResultDTO();

    if(this.destoyPoints > 0){
      this.player.currentPlayerHP -= this.destoyPoints;
    }

    res.isSuccess = this.destoyPoints <= 0;
    res.currentHP = this.player.currentPlayerHP;         

    if(res.isSuccess){
       
      res.discardedAbility.push(...this.abilityCards);      
      if(this.currentRewardCard !== undefined){
        res.discardedAbility.push(this.currentRewardCard);
      }

      res.destroyedAbility = [];

      for(const threat of this.turn.threats){
        if(threat !== this.currentThreatCard){
          res.discardedThreat.push(threat);
        }
      }

      res.destroyedThreat.push(this.currentThreatCard);

    }else{
      console.log('discarded threats');
      console.log(this.turn.threats);

      for(const ability of this.abilityCards){
        if(!this.destroyedSelector.selected.includes(ability)){
          res.discardedAbility.push(ability);
        }
      }

      res.destroyedAbility.push(...this.destroyedSelector.selected);

      res.discardedThreat.push(...this.turn.threats);

      res.destroyedThreat = [];
    }

    this.gameData.EndTurn(JSON.stringify(res));

    this.NextTurn();

    return res;
  }

  public GetCardSelector(): ICardSelector {
    
    this.destroyedSelector.Init(this.destoyPoints);
    return this.destroyedSelector;    
  }

  private RestoreAbilityCardFromDTO(cardDTO: string): ICardAbility | undefined {
    
    let card: ICardAbility = JSON.parse(cardDTO, (key, value) => {
      if(key === 'ability' && value !== null){
        switch (value.code) {
          case ABILITY_CODE.ADDLIFE:            
            value = Object.assign(new CardAbilityActionChangeLife(0), value);
            break;   
          case ABILITY_CODE.PHASELESS:            
            value = Object.assign(new CardAbilityActionPhaseLess, value);
            break; 
          case ABILITY_CODE.ADDCARDS:            
            value = Object.assign(new CardAbilityActionAddCards(0), value);
            break;                                                     
          default:
            break;
        }
      }       
      return value;
    }) as ICardAbility;

    return card;
  }

  public onDraw(isExtraDraw: boolean = false): void {
    this.DrawAbilityCard(isExtraDraw);
  }

  public onEndFight(){
    this.EndFight();
  }  

  public onEndTurn(){
    this.EndTurn();
  }

  public onTest(): void {

    /*
    */
  }
}
