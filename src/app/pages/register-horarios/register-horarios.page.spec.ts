import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterHorariosPage } from './register-horarios.page';

describe('RegisterHorariosPage', () => {
  let component: RegisterHorariosPage;
  let fixture: ComponentFixture<RegisterHorariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
