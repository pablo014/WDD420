import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoresEditComponent } from './chores-edit.component';

describe('ChoresEditComponent', () => {
  let component: ChoresEditComponent;
  let fixture: ComponentFixture<ChoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoresEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
