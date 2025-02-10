import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBotsPage } from './chat-bots.page';

describe('ChatBotsPage', () => {
  let component: ChatBotsPage;
  let fixture: ComponentFixture<ChatBotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
