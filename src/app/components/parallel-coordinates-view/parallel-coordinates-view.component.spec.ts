import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallelCoordinatesViewComponent } from './parallel-coordinates-view.component';

describe('ParallelCoordinatesViewComponent', () => {
  let component: ParallelCoordinatesViewComponent;
  let fixture: ComponentFixture<ParallelCoordinatesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParallelCoordinatesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallelCoordinatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
