import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAbstainBallotComponent } from './no-abstain-ballot.component';

describe('NoAbstainBallotComponent', () => {
  let component: NoAbstainBallotComponent;
  let fixture: ComponentFixture<NoAbstainBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAbstainBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAbstainBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
