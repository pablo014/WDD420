import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoresDetailsComponent } from './chores-details.component';

describe('ChoresDetailsComponent', () => {
  let component: ChoresDetailsComponent;
  let fixture: ComponentFixture<ChoresDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoresDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
