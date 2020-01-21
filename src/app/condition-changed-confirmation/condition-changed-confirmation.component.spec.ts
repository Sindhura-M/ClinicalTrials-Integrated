import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionChangedConfirmationComponent } from './condition-changed-confirmation.component';

describe('ConditionChangedConfirmationComponent', () => {
  let component: ConditionChangedConfirmationComponent;
  let fixture: ComponentFixture<ConditionChangedConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionChangedConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionChangedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
