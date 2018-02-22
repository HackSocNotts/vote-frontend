import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StvBallotComponent } from './stv-ballot.component';

describe('StvBallotComponent', () => {
  let component: StvBallotComponent;
  let fixture: ComponentFixture<StvBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StvBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StvBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
