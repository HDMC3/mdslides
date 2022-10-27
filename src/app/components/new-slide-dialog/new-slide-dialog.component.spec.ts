import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSlideDialogComponent } from './new-slide-dialog.component';

describe('NewSlideDialogComponent', () => {
  let component: NewSlideDialogComponent;
  let fixture: ComponentFixture<NewSlideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSlideDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
