import { Routes } from '@angular/router';
import { CardThreatSelectorComponent } from './card-threat-selector/card-threat-selector.component';
import { ThreatFightingDisplayComponent } from './threat-fighting-display/threat-fighting-display.component';

export const routes: Routes = [
    { path: '', redirectTo: '/turn/new', pathMatch: 'full' },        
    { path: 'turn/:status', component: CardThreatSelectorComponent },
    { path: 'fightThreat', component: ThreatFightingDisplayComponent },
];
