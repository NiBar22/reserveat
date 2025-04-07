import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantUploadsPage } from './restaurant-uploads.page';

describe('RestaurantUploadsPage', () => {
  let component: RestaurantUploadsPage;
  let fixture: ComponentFixture<RestaurantUploadsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantUploadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
