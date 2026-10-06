import { ComponentFixture, TestBed } from '@angular/core/testing';
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

    it('unlocks a chord when its three keys are pressed and clears active keys', () => {
        const chord = component.chords[0];

        chord.keys.forEach((key) => component.keyPressed(key));

        expect(component.activeChords().has(0)).toBe(true);
        expect(component.activeKeys().size).toBe(0);
        expect(component.isWin()).toBe(false);
    });

    it('sets isWin when all chords are unlocked', () => {
        component.chords.forEach((chord) => {
            chord.keys.forEach((key) => component.keyPressed(key));
        });

        expect(component.activeChords().size).toBe(component.chordsAmount);
        expect(component.isWin()).toBe(true);
    });
});
