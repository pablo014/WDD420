import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoresItemComponent } from './chores-item.component';

describe('ChoresItemComponent', () => {
  let component: ChoresItemComponent;
  let fixture: ComponentFixture<ChoresItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoresItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
