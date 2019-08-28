import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastcancerComponent } from './header.component';

describe('BreastcancerComponent', () => {
  let component: BreastcancerComponent;
  let fixture: ComponentFixture<BreastcancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreastcancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastcancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
