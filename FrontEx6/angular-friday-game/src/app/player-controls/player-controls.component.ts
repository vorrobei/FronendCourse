import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [],
  templateUrl: './player-controls.component.html',
  styleUrl: './player-controls.component.css'
})
export class PlayerControlsComponent {

  constructor (private gameController: GameControllerService){    
  }

  public onTest(): void {    
    this.gameController.onTest();
  }
}
