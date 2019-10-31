import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTrialComponent } from './individual-trial.component';

describe('IndividualTrialComponent', () => {
  let component: IndividualTrialComponent;
  let fixture: ComponentFixture<IndividualTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
