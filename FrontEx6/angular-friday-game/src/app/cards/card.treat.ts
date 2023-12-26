import { ICard } from "./card";
import { ICardAbility } from "./card.ability";

export interface ICardThreat extends ICard {
   
    /*
    id: number;

    name: string;
    */

    freeCards: number;

    levelValues: Array<number>;

    rewardCardID: number;  
    
    rewardCard: ICardAbility | undefined;
}