import { ICardThreat } from "./card.treat";

export interface ICardDeck<T> {

    cards: Array<T>;

    name: string;

    Shuffle(): void;

    AddCard(card: T): void;

    RemoveCard(): void;

    DrawCard(): T | undefined;

    DiscardCard(card: T): void;
}

export class CardDeck<T> implements ICardDeck<T> {
    
    // карты в колоде
    cards: Array<T> = new Array<T>();
    // сброшенные карты
    discardedCards: Array<T> = new Array<T>();
    
    name: string = "Deck";

    constructor(deckName: string){
        this.name = deckName;
    }
    
    public Shuffle(): void {  
        
        if(this.discardedCards.length > 0){
            this.cards.push(...this.discardedCards);
        }

        this.cards.sort(() => Math.random() - 0.5);         
    }

    public DrawCard(): T | undefined {                
        let card: T | undefined = this.cards.pop();                    
        
        if(card !== undefined && !this.discardedCards.includes(card)){
            this.discardedCards.push(card);
        }        

        return card;
    }   
    
    public DiscardCard(card: T): void {
        if(card !== undefined && !this.discardedCards.includes(card)){
            this.discardedCards.push(card);
        }        
    }        

    AddCard(card: T): void {
        throw new Error("Method not implemented.");
    }
    
    RemoveCard(): void {
        throw new Error("Method not implemented.");
    }
}