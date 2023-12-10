import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICardThreat } from './cards/card.treat';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  public drawThreatCard = new Subject<ICardThreat>();

  constructor() { }

  public onTest(): void {

    this.drawThreatCard.next(
      { 
        id: 301, 
        name: 'with the raft to the wreck', 
        freeCards: 1, 
        levelValues: [0, 1, 3], 
        revardCardID: 201,
      });
  }
}
