import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedVotesComponent } from './recieved-votes.component';

describe('RecievedVotesComponent', () => {
  let component: RecievedVotesComponent;
  let fixture: ComponentFixture<RecievedVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
