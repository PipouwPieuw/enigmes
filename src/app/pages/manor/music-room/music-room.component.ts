import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    computed,
    inject,
    signal,
} from '@angular/core';

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
    static readonly debug = signal(false);
    readonly debug = MusicRoomComponent.debug;
    static readonly chordResolveFallbackMs = 1500;
    static readonly revealTickMs = 90;
    static readonly revealCrimeLeadMs = 1000;
    /** Staggered starts; crime index is not forced last. */
    static readonly revealStartOffsetsMs = [120, 0, 280, 50, 200, 340, 80, 160] as const;
    /** Slight duration variance for non-crime icons. */
    static readonly revealBaseDurationsMs = [2800, 3000, 2600, 3100, 2700, 2900, 2500, 3050] as const;

    private readonly destroyRef = inject(DestroyRef);
    private readonly revealTimers = new Set<ReturnType<typeof setTimeout>>();
    private readonly revealIntervals = new Set<ReturnType<typeof setInterval>>();

    readonly soundsAmount = 17;
    readonly chordsAmount = 8;
    readonly crimeIcon = 'skull';
    readonly keyIndexes = Array.from({ length: this.soundsAmount }, (_, i) => i + 1);
    readonly playingSound = signal(0);
    readonly activeKeys = signal<ReadonlySet<number>>(new Set());
    readonly activeChords = signal<ReadonlySet<number>>(new Set());
    readonly inputLocked = signal(false);
    readonly revealActive = signal(false);
    readonly revealDone = signal(false);
    readonly hiddenChords = signal<ReadonlySet<number>>(new Set());
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
    readonly displayedIcons = signal<string[]>(this.chords.map((chord) => chord.icon));
    pageText = "<p>Dans la salle de musique, le seul élément qui attire votre attention est un vieux piano dont les touches ne jouent pas des notes mais des sons à priori sans aucun lien les uns avec les autres. Des symboles sont affichés au-dessus du clavier.</p>";

    constructor() {
        this.destroyRef.onDestroy(() => this.clearRevealTimers());
    }

    keyPressed(index: number) {
        if (this.inputLocked()) {
            return;
        }

        const wasActive = this.activeKeys().has(index);

        this.activeKeys.update((keys) => {
            if (wasActive) {
                const next = new Set(keys);
                next.delete(index);
                return next;
            }

            // Chords are exactly 3 keys: a 4th press starts a fresh selection.
            if (keys.size >= 3) {
                return new Set([index]);
            }

            const next = new Set(keys);
            next.add(index);
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
        const matchedIndex = this.chords.findIndex(
            (chord, chordIndex) =>
                this.compareSets([...chord.keys], keys) && !this.activeChords().has(chordIndex),
        );

        if (matchedIndex === -1) {
            return;
        }

        void this.resolveChord(matchedIndex);
    }

    startReveal() {
        if (this.revealActive() || this.revealDone()) {
            return;
        }

        this.inputLocked.set(true);
        this.revealActive.set(true);
        this.hiddenChords.set(new Set());
        this.displayedIcons.set(this.chords.map((chord) => chord.icon));

        const crimeIndex = this.chords.findIndex((chord) => chord.icon === this.crimeIcon);
        const durations = this.buildRevealDurations(crimeIndex);

        this.chords.forEach((_, index) => {
            const startOffset = MusicRoomComponent.revealStartOffsetsMs[index] ?? 0;
            const duration = durations[index];
            const isCrime = index === crimeIndex;

            const startTimer = setTimeout(() => {
                this.revealTimers.delete(startTimer);
                this.runIconShuffle(index, duration, isCrime);
            }, startOffset);

            this.revealTimers.add(startTimer);
        });

        const totalMs = this.getRevealTotalMs(crimeIndex, durations);
        const doneTimer = setTimeout(() => {
            this.revealTimers.delete(doneTimer);
            this.revealActive.set(false);
            this.revealDone.set(true);
        }, totalMs);

        this.revealTimers.add(doneTimer);
    }

    /** Longest end time across all icon shuffles (for tests / done flag). */
    getRevealTotalMs(
        crimeIndex = this.chords.findIndex((chord) => chord.icon === this.crimeIcon),
        durations = this.buildRevealDurations(crimeIndex),
    ): number {
        return this.chords.reduce((max, _, index) => {
            const start = MusicRoomComponent.revealStartOffsetsMs[index] ?? 0;
            return Math.max(max, start + durations[index]);
        }, 0);
    }

    private buildRevealDurations(crimeIndex: number): number[] {
        const durations: number[] = this.chords.map((_, index) => {
            if (index === crimeIndex) {
                return 0;
            }
            return MusicRoomComponent.revealBaseDurationsMs[index] ?? 2800;
        });

        let maxOtherEnd = 0;
        this.chords.forEach((_, index) => {
            if (index === crimeIndex) {
                return;
            }
            const start = MusicRoomComponent.revealStartOffsetsMs[index] ?? 0;
            maxOtherEnd = Math.max(maxOtherEnd, start + durations[index]);
        });

        const crimeStart = MusicRoomComponent.revealStartOffsetsMs[crimeIndex] ?? 0;
        durations[crimeIndex] =
            maxOtherEnd + MusicRoomComponent.revealCrimeLeadMs - crimeStart;

        return durations;
    }

    private runIconShuffle(index: number, durationMs: number, isCrime: boolean) {
        const iconPool = this.chords.map((chord) => chord.icon);
        let tick = 0;

        const interval = setInterval(() => {
            tick += 1;
            const nextIcon = iconPool[tick % iconPool.length];
            this.displayedIcons.update((icons) => {
                const next = [...icons];
                // Avoid leaving the same glyph on consecutive ticks when possible.
                next[index] =
                    nextIcon === next[index]
                        ? iconPool[(tick + 1) % iconPool.length]
                        : nextIcon;
                return next;
            });
        }, MusicRoomComponent.revealTickMs);

        this.revealIntervals.add(interval);

        const endTimer = setTimeout(() => {
            this.revealTimers.delete(endTimer);
            clearInterval(interval);
            this.revealIntervals.delete(interval);

            if (isCrime) {
                this.displayedIcons.update((icons) => {
                    const next = [...icons];
                    next[index] = this.crimeIcon;
                    return next;
                });
            } else {
                this.hiddenChords.update((hidden) => new Set(hidden).add(index));
            }
        }, durationMs);

        this.revealTimers.add(endTimer);
    }

    private clearRevealTimers() {
        this.revealTimers.forEach((timer) => clearTimeout(timer));
        this.revealTimers.clear();
        this.revealIntervals.forEach((interval) => clearInterval(interval));
        this.revealIntervals.clear();
    }

    private async resolveChord(chordIndex: number) {
        this.inputLocked.set(true);

        await this.waitForCurrentSound();

        this.activeChords.update((chords) => new Set(chords).add(chordIndex));
        this.activeKeys.set(new Set());

        if (this.isWin()) {
            this.startReveal();
            return;
        }

        this.inputLocked.set(false);
    }

    private waitForCurrentSound(): Promise<void> {
        // Prefer waiting for the note that completed the chord.
        // Fallback covers silent / failed playback (play() is async; paused is unreliable here).
        if (this.playingSound() === 0 || this.audio.ended) {
            return new Promise((resolve) => {
                setTimeout(resolve, MusicRoomComponent.chordResolveFallbackMs);
            });
        }

        return new Promise((resolve) => {
            let settled = false;
            const finish = () => {
                if (settled) {
                    return;
                }
                settled = true;
                clearTimeout(fallbackTimer);
                this.playingSound.set(0);
                resolve();
            };

            const fallbackTimer = setTimeout(
                finish,
                MusicRoomComponent.chordResolveFallbackMs,
            );

            this.audio.onended = () => finish();
        });
    }

    compareSets(set1: number[], set2: number[]) {
        if (set1.length != set2.length)
            return false;
        for (const i in set1)
            if (!set2.includes(set1[i]))
                return false;
        return true;
    }
}
