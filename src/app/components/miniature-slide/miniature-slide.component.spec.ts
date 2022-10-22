import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureSlideComponent } from './miniature-slide.component';

describe('MiniatureSlideComponent', () => {
  let component: MiniatureSlideComponent;
  let fixture: ComponentFixture<MiniatureSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniatureSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniatureSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
