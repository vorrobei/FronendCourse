import { ICardThreat } from "./card.treat";

export interface ICardDeck<T> {

    cards: Array<T>;

    name: string;

    Shuffle(): void;

    AddCard(): void;

    RemoveCard(): void;

    DrawCard(): T;

}

export class CardThreatDeck implements ICardDeck<ICardThreat> {
    
    cards: ICardThreat[] = [];
    
    name: string = "Threat Deck";
    
    Shuffle(): void {
        throw new Error("Method not implemented.");
    }
    
    AddCard(): void {
        throw new Error("Method not implemented.");
    }
    
    RemoveCard(): void {
        throw new Error("Method not implemented.");
    }
    
    DrawCard(): ICardThreat {
        throw new Error("Method not implemented.");
    }

}