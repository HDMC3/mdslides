import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarpitThemesDialogComponent } from './marpit-themes-dialog.component';

describe('MarpitThemesDialogComponent', () => {
  let component: MarpitThemesDialogComponent;
  let fixture: ComponentFixture<MarpitThemesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarpitThemesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarpitThemesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
