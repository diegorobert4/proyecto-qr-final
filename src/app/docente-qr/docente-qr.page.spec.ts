import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteQrPage } from './docente-qr.page';

describe('DocenteQrPage', () => {
  let component: DocenteQrPage;
  let fixture: ComponentFixture<DocenteQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
