import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessedResultsComponent } from './proccessed-results.component';

describe('ProccessedResultsComponent', () => {
  let component: ProccessedResultsComponent;
  let fixture: ComponentFixture<ProccessedResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProccessedResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProccessedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
