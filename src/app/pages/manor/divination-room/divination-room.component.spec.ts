import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DivinationRoomComponent } from './divination-room.component';

describe('DivinationRoomComponent', () => {
  let component: DivinationRoomComponent;
  let fixture: ComponentFixture<DivinationRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivinationRoomComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivinationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
