import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedVotesComponent } from './recieved-votes.component';

describe('ReceivedVotesComponent', () => {
  let component: ReceivedVotesComponent;
  let fixture: ComponentFixture<ReceivedVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
