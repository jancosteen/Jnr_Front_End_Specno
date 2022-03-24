import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Player1BoxComponent } from './player1-box.component';

describe('Player1BoxComponent', () => {
  let component: Player1BoxComponent;
  let fixture: ComponentFixture<Player1BoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Player1BoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Player1BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
