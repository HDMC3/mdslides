import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniaturesComponent } from './miniatures.component';

describe('MiniaturesComponent', () => {
  let component: MiniaturesComponent;
  let fixture: ComponentFixture<MiniaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
