import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ArtRoomComponent } from './art-room.component';

describe('ArtRoomComponent', () => {
  let component: ArtRoomComponent;
  let fixture: ComponentFixture<ArtRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtRoomComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
