import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatDisplayComponent } from './threat-display.component';

describe('ThreatDisplayComponent', () => {
  let component: ThreatDisplayComponent;
  let fixture: ComponentFixture<ThreatDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
