import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBallotComponent } from './basic-ballot.component';

describe('BasicBallotComponent', () => {
  let component: BasicBallotComponent;
  let fixture: ComponentFixture<BasicBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
