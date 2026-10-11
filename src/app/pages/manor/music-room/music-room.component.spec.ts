import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MusicRoomComponent } from './music-room.component';

describe('MusicRoomComponent', () => {
    let component: MusicRoomComponent;
    let fixture: ComponentFixture<MusicRoomComponent>;

    beforeEach(async () => {
        vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
        vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
        vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);

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

    it('compareSets matches equal key multisets regardless of order', () => {
        expect(component.compareSets([2, 8, 13], [13, 2, 8])).toBe(true);
    });

    it('compareSets rejects mismatched lengths or values', () => {
        expect(component.compareSets([2, 8, 13], [2, 8])).toBe(false);
        expect(component.compareSets([2, 8, 13], [2, 8, 14])).toBe(false);
    });

    it('unlocks a chord when its three keys are pressed and clears active keys', fakeAsync(() => {
        const chord = component.chords[0];

        chord.keys.forEach((key) => component.keyPressed(key));

        expect(component.inputLocked()).toBe(true);
        expect(component.activeChords().has(0)).toBe(false);
        expect(component.activeKeys().size).toBe(chord.keys.length);

        tick(MusicRoomComponent.chordResolveFallbackMs);

        expect(component.inputLocked()).toBe(false);
        expect(component.activeChords().has(0)).toBe(true);
        expect(component.activeKeys().size).toBe(0);
        expect(component.isWin()).toBe(false);
    }));

    it('ignores key presses while input is locked', fakeAsync(() => {
        const chord = component.chords[0];

        chord.keys.forEach((key) => component.keyPressed(key));
        component.keyPressed(1);

        expect(component.activeKeys().has(1)).toBe(false);

        tick(MusicRoomComponent.chordResolveFallbackMs);
    }));

    it('replaces the selection when a 4th key is pressed', () => {
        component.keyPressed(1);
        component.keyPressed(2);
        component.keyPressed(3);
        component.keyPressed(4);

        expect(component.activeKeys()).toEqual(new Set([4]));
    });

    it('sets isWin when all chords are unlocked and keeps input locked', fakeAsync(() => {
        component.chords.forEach((chord) => {
            chord.keys.forEach((key) => component.keyPressed(key));
            tick(MusicRoomComponent.chordResolveFallbackMs);
        });

        expect(component.activeChords().size).toBe(component.chordsAmount);
        expect(component.isWin()).toBe(true);
        expect(component.inputLocked()).toBe(true);
        expect(component.revealActive()).toBe(true);

        tick(component.getRevealTotalMs());

        expect(component.revealDone()).toBe(true);
        expect(component.inputLocked()).toBe(true);
    }));

    it('startReveal locks input, hides non-crime icons, and keeps the skull', fakeAsync(() => {
        const crimeIndex = component.chords.findIndex(
            (chord) => chord.icon === component.crimeIcon,
        );

        component.startReveal();

        expect(component.inputLocked()).toBe(true);
        expect(component.revealActive()).toBe(true);

        tick(component.getRevealTotalMs());

        expect(component.revealDone()).toBe(true);
        expect(component.inputLocked()).toBe(true);
        expect(component.displayedIcons()[crimeIndex]).toBe('skull');
        expect(component.hiddenChords().has(crimeIndex)).toBe(false);

        component.chords.forEach((chord, index) => {
            if (index === crimeIndex) {
                return;
            }
            expect(component.hiddenChords().has(index)).toBe(true);
        });
    }));

    it('startReveal is a no-op when reveal already finished', fakeAsync(() => {
        component.startReveal();
        tick(component.getRevealTotalMs());

        component.startReveal();

        expect(component.revealActive()).toBe(false);
        expect(component.revealDone()).toBe(true);
    }));
});
