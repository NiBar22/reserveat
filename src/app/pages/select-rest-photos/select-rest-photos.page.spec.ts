import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectRestPhotosPage } from './select-rest-photos.page';

describe('SelectRestPhotosPage', () => {
  let component: SelectRestPhotosPage;
  let fixture: ComponentFixture<SelectRestPhotosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRestPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
