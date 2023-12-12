import { Routes } from '@angular/router';
import { CardThreatSelectorComponent } from './card-threat-selector/card-threat-selector.component';
import { CardsDisplayComponent } from './cards-display/cards-display.component';

export const routes: Routes = [
    { path: '', redirectTo: '/selectThreat', pathMatch: 'full' },    
    { path: 'selectThreat', component: CardThreatSelectorComponent },
    { path: 'fightThreat/:cardID', component: CardsDisplayComponent },    
];
