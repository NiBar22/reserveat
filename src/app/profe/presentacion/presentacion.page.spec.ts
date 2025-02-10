import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentacionPage } from './presentacion.page';

describe('PresentacionPage', () => {
  let component: PresentacionPage;
  let fixture: ComponentFixture<PresentacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
