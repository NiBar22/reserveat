import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaConfirmadaPage } from './reserva-confirmada.page';

describe('ReservaConfirmadaPage', () => {
  let component: ReservaConfirmadaPage;
  let fixture: ComponentFixture<ReservaConfirmadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaConfirmadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
