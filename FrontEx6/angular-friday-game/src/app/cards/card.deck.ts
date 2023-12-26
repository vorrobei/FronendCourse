import { ICard } from "./card";

export interface ICardDeck<T extends ICard> {

    cards: Array<T>;

    name: string;

    Shuffle(): void;

    AddCard(card: T): void;

    RemoveCard(): void;

    DrawCard(): T | undefined;

    DiscardCard(discardedCard: T): void;

    DestroyCard(destroyedCard: T): void;

    DrawCardByID(cardID: number): T | undefined;
}

export class CardDeck<T extends ICard> implements ICardDeck<T> {
    
    // cards in deck
    cards: Array<T> = new Array<T>();
    // discarded cards
    discardedCards: Array<T> = new Array<T>();
    // drawed cards
    drawedCards: Array<T> = new Array<T>(); 
    
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
        
        if(card !== undefined && this.GetDrawedCardByID(card.id) === undefined){
            this.drawedCards.push(card);
        }        

        return card;
    }   

    // #todo
    public DrawCardByID(cardID: number): T | undefined {
                
        let card: T | undefined = this.GetCardByID(cardID);                    
        
        if(card !== undefined && this.GetDrawedCardByID(card.id) === undefined){
            this.drawedCards.push(card);
        }               

        return card;
    }        
    
    public DiscardCard(discardCard: T): void {
            
        if(discardCard === undefined) return;
        
        let card: T | undefined = undefined;

        card = this.GetCardByID(discardCard.id);
        if(card !== undefined){            
            this.cards.splice(this.cards.indexOf(card), 1)
        }

        card = this.GetDrawedCardByID(discardCard.id);
        if(card !== undefined){            
            this.drawedCards.splice(this.drawedCards.indexOf(card), 1)
        }        

        if(this.GetDiscardedCardByID(discardCard.id) === undefined){
            this.discardedCards.push(discardCard);
        }
    }

    public DestroyCard(destroyedCard: T): void {
        
        if(destroyedCard === undefined) return;

        let card: T | undefined = undefined;        
        
        card = this.GetCardByID(destroyedCard.id);
        if(card !== undefined){            
            this.cards.splice(this.cards.indexOf(card), 1)
        }

        card = this.GetDrawedCardByID(destroyedCard.id);
        if(card !== undefined){            
            this.drawedCards.splice(this.drawedCards.indexOf(card), 1)
        }        

        card = this.GetDrawedCardByID(destroyedCard.id);
        if(card !== undefined){            
            this.discardedCards.splice(this.discardedCards.indexOf(card), 1)
        }               
    }

    private GetCardByID(cardID: number): T | undefined {
        
        let resCard: T | undefined = this.cards.find((card: T) => { 
            return card.id === cardID
        });        

        return resCard;
    }

    private GetDrawedCardByID(cardID: number): T | undefined {
        
        let resCard: T | undefined = this.drawedCards.find((card: T) => { 
            return card.id === cardID
        });

        return resCard;
    }

    private GetDiscardedCardByID(cardID: number): T | undefined {
        let resCard: T | undefined = this.discardedCards.find((card: T) => { 
            return card.id === cardID
        });

        return resCard;
    }    

    AddCard(card: T): void {
        throw new Error("Method not implemented.");
    }
    
    RemoveCard(): void {
        throw new Error("Method not implemented.");
    }
}