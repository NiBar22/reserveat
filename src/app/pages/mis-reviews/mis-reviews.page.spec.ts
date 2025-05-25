import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisReviewsPage } from './mis-reviews.page';

describe('MisReviewsPage', () => {
  let component: MisReviewsPage;
  let fixture: ComponentFixture<MisReviewsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
