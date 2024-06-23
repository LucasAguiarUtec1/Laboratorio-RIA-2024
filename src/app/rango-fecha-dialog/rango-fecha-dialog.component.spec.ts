import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoFechaDialogComponent } from './rango-fecha-dialog.component';

describe('RangoFechaDialogComponent', () => {
  let component: RangoFechaDialogComponent;
  let fixture: ComponentFixture<RangoFechaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangoFechaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangoFechaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
