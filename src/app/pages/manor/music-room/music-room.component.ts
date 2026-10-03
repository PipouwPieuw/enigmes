import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

interface OrganChord {
    keys: readonly number[];
    icon: string;
}

@Component({
    selector: 'app-music-room',
    imports: [
        TopBarComponent
    ],
    templateUrl: './music-room.component.html',
    styleUrl: './music-room.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicRoomComponent {
    readonly soundsAmount = 17;
    readonly chordsAmount = 8;
    readonly keyIndexes = Array.from({ length: this.soundsAmount }, (_, i) => i + 1);
    readonly playingSound = signal(0);
    readonly activeKeys = signal<ReadonlySet<number>>(new Set());
    readonly activeChords = signal<ReadonlySet<number>>(new Set());
    readonly isWin = computed(() => this.activeChords().size === this.chordsAmount);
    audio = new Audio();
    readonly chords: readonly OrganChord[] = [
        { keys: [2, 8, 13], icon: 'ladder' },
        { keys: [4, 9, 12], icon: 'pillar' },
        { keys: [6, 12, 17], icon: 'bed' },
        { keys: [10, 14, 16], icon: 'boat' },
        { keys: [5, 7, 15], icon: 'door' },
        { keys: [1, 6, 16], icon: 'skull' },
        { keys: [3, 12, 14], icon: 'rudder' },
        { keys: [2, 11, 13], icon: 'chimney' },
    ];
    pageText = "Texte d'explication de la page";

    keyPressed(index:number) {
        const wasActive = this.activeKeys().has(index);

        this.activeKeys.update((keys) => {
            const next = new Set(keys);
            if (wasActive) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });

        if (wasActive) {
            if (this.playingSound() === index) {
                this.playingSound.set(0);
                this.audio.pause();
            }
        } else {
            this.playingSound.set(index);
            this.audio.src = 'assets/sound/manor/music-room/' + index + '.wav';
            this.audio.load();
            this.audio.play();
            this.audio.onended = () => {
                this.playingSound.set(0);
            };
        }
        this.checkChord();
    }

    checkChord() {
        const keys = Array.from(this.activeKeys());
        this.chords.forEach((chord, chordIndex) => {
            if (this.compareSets([...chord.keys], keys) && !this.activeChords().has(chordIndex)) {
                this.activeChords.update((chords) => new Set(chords).add(chordIndex));
                this.activeKeys.set(new Set());
            }
        });
        if (this.isWin()) {
            console.log("WIN");
        }
    }

    compareSets(set1:number[], set2:number[]) {
        if(set1.length != set2.length)
            return false;
        for(const i in set1)
            if(!set2.includes(set1[i]))
                return false;
        return true;
    }
}
