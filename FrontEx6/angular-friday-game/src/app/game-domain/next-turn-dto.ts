import { ICardThreat } from '../cards/card.treat';
import { PlayerDTO } from './player-dto';

export class NextTurnDTO {    

    public player: PlayerDTO;

    public threatLevel: number;

    public threats: Array<ICardThreat>;

    constructor (player: PlayerDTO, threatLevel: number, threats: Array<ICardThreat>) {

        this.player = player;
        this.threatLevel = threatLevel;
        this.threats = threats;
    }
}