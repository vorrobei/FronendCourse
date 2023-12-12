import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatFightingDisplayComponent } from './threat-fighting-display.component';

describe('ThreatFightingDisplayComponent', () => {
  let component: ThreatFightingDisplayComponent;
  let fixture: ComponentFixture<ThreatFightingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatFightingDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreatFightingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
