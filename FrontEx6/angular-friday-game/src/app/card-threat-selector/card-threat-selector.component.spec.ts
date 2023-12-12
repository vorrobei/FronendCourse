import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThreatSelectorComponent } from './card-threat-selector.component';

describe('CardThreatSelectorComponent', () => {
  let component: CardThreatSelectorComponent;
  let fixture: ComponentFixture<CardThreatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardThreatSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardThreatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
