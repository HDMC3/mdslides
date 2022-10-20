import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSlideComponent } from './current-slide.component';

describe('CurrentSlideComponent', () => {
  let component: CurrentSlideComponent;
  let fixture: ComponentFixture<CurrentSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
