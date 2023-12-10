import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThreatComponent } from './card-threat.component';

describe('CardThreatComponent', () => {
  let component: CardThreatComponent;
  let fixture: ComponentFixture<CardThreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardThreatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
