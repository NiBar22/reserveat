import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterRestaurantePage } from './register-restaurante.page';

describe('RegisterRestaurantePage', () => {
  let component: RegisterRestaurantePage;
  let fixture: ComponentFixture<RegisterRestaurantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
