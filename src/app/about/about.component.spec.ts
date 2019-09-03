import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCTCComponent } from './about.component';

describe('AboutCTCComponent', () => {
  let component: AboutCTCComponent;
  let fixture: ComponentFixture<AboutCTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
