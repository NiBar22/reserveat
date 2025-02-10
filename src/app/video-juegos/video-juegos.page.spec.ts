import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoJuegosPage } from './video-juegos.page';

describe('VideoJuegosPage', () => {
  let component: VideoJuegosPage;
  let fixture: ComponentFixture<VideoJuegosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
