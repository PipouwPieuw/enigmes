import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  it('drag-swaps two slots after pointer drop', fakeAsync(() => {
    const buttons = fixture.nativeElement.querySelectorAll('.app_gallery__portrait_inner') as NodeListOf<HTMLButtonElement>;
    const fromButton = buttons[0];
    const toSlot = fixture.nativeElement.querySelector('[data-slot-index="7"]') as HTMLElement;

    const fromRect = fromButton.getBoundingClientRect();
    const toRect = toSlot.getBoundingClientRect();
    const startX = fromRect.left + fromRect.width / 2;
    const startY = fromRect.top + fromRect.height / 2;
    const endX = toRect.left + toRect.width / 2;
    const endY = toRect.top + toRect.height / 2;

    fromButton.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true,
      button: 0,
      pointerId: 1,
      clientX: startX,
      clientY: startY,
    }));

    fromButton.dispatchEvent(new PointerEvent('pointermove', {
      bubbles: true,
      pointerId: 1,
      clientX: startX + 20,
      clientY: startY + 20,
    }));
    fixture.detectChanges();

    expect(component.draggingSlot()).toBe(0);

    spyOn(document, 'elementsFromPoint').and.returnValue([toSlot]);

    fromButton.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true,
      pointerId: 1,
      clientX: endX,
      clientY: endY,
    }));
    fixture.detectChanges();

    expect(component.isAnimating()).toBeTrue();

    tick(320);
    fixture.detectChanges();

    expect(component.portraits()).toEqual([7, 1, 2, 3, 4, 5, 6, 0]);
    expect(component.draggingSlot()).toBeNull();
    expect(component.isAnimating()).toBeFalse();
  }));

  it('ignores click after a drag gesture', () => {
    component['suppressClick'] = true;
    component.onPortraitClick(2);

    expect(component.selectedPortrait()).toBe(-1);
    expect(component['suppressClick']).toBeFalse();
  });
});
