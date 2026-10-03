import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects and deselects a portrait', () => {
    component.selectPortrait(3);
    expect(component.selectedPortrait()).toBe(3);

    component.selectPortrait(3);
    expect(component.selectedPortrait()).toBe(-1);
  });

  it('swaps two portraits and clears selection', () => {
    component.selectPortrait(0);
    component.selectPortrait(7);

    expect(component.portraits()).toEqual([7, 1, 2, 3, 4, 5, 6, 0]);
    expect(component.selectedPortrait()).toBe(-1);
    expect(component.isWin()).toBeFalse();
  });

  it('sets isWin when portraits match the provisional correct order', () => {
    expect(component.isWin()).toBeFalse();

    component.portraits.set([...component.correctOrder]);

    expect(component.isWin()).toBeTrue();
  });
});
