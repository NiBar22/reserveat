import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComensalPage } from './register-comensal.page';

describe('RegisterComensalPage', () => {
  let component: RegisterComensalPage;
  let fixture: ComponentFixture<RegisterComensalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComensalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
