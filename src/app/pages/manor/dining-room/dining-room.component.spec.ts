import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DiningRoomComponent } from './dining-room.component';

describe('DiningRoomComponent', () => {
  let component: DiningRoomComponent;
  let fixture: ComponentFixture<DiningRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiningRoomComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Skip the first-interaction rAF arming path in interaction tests.
    component.transitionsEnabled.set(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps clock transitions off until a dial interaction', () => {
    const localFixture = TestBed.createComponent(DiningRoomComponent);

    expect(localFixture.componentInstance.transitionsEnabled()).toBeFalse();

    localFixture.componentInstance.setDigitsRotation(3);

    expect(localFixture.componentInstance.transitionsEnabled()).toBeTrue();
  });

  it('updates clock value signals through setters', () => {
    component.setDigitsRotation(3);
    component.setSymbolsRotation(8);
    component.setSymbolsClockRotation(5);

    expect(component.digitsValue()).toBe(3);
    expect(component.symbolsValue()).toBe(8);
    expect(component.symbolsClockValue()).toBe(5);
  });

  it('does not win when only part of the provisional solution is set', () => {
    component.setDigitsRotation(component.correctClock.digits);
    component.setSymbolsRotation(component.correctClock.symbols);

    expect(component.isWin()).toBeFalse();
  });

  it('sets isWin when digits, symbols, and ring match the provisional solution', () => {
    component.setDigitsRotation(component.correctClock.digits);
    component.setSymbolsRotation(component.correctClock.symbols);
    component.setSymbolsClockRotation(component.correctClock.symbolsClock);

    expect(component.isWin()).toBeTrue();
  });
});
