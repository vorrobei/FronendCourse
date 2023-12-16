import { v4 as uuidv4 } from 'uuid';

export class PlayerDTO {

    // player id
    public playerID: string = uuidv4();
    // max player HP
    public maxPlayerHP: number = 22;
    // current player HP
    public currentPlayerHP: number = 20;

    constructor (maxHP: number, currentHP: number) {
        
        this.playerID = uuidv4();

        this.maxPlayerHP = maxHP;
        this.currentPlayerHP = currentHP;
    }
}