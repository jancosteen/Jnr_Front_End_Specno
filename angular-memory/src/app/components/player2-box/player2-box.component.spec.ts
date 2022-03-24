import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Player2BoxComponent } from './player2-box.component';

describe('Player2BoxComponent', () => {
  let component: Player2BoxComponent;
  let fixture: ComponentFixture<Player2BoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Player2BoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Player2BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
