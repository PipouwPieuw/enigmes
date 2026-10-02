import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MusicRoomComponent } from './music-room.component';

describe('MusicRoomComponent', () => {
  let component: MusicRoomComponent;
  let fixture: ComponentFixture<MusicRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicRoomComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
