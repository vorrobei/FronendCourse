import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAbilityComponent } from './card-ability.component';

describe('CardAbilityComponent', () => {
  let component: CardAbilityComponent;
  let fixture: ComponentFixture<CardAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAbilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
