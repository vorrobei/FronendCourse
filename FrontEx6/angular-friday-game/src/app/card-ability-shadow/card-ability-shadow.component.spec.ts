import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAbilityShadowComponent } from './card-ability-shadow.component';

describe('CardAbilityShadowComponent', () => {
  let component: CardAbilityShadowComponent;
  let fixture: ComponentFixture<CardAbilityShadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAbilityShadowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAbilityShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
