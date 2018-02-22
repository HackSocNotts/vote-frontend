import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvBallotComponent } from './av-ballot.component';

describe('AvBallotComponent', () => {
  let component: AvBallotComponent;
  let fixture: ComponentFixture<AvBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
