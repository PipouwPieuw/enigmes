import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

interface ClockMark {
    value: number;
    rotation: number;
}

interface SymbolMark extends ClockMark {
    clockRotation: number;
}

@Component({
    selector: 'app-dining-room',
    imports: [
        TopBarComponent
    ],
    templateUrl: './dining-room.component.html',
    styleUrl: './dining-room.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiningRoomComponent {
    imgPath = 'assets/images/manor/dining-room/';
    pageText = "Texte d'explication de la page";
    // Provisional — replace when §0/§1 design lands
    readonly correctClock = {
        digits: 3,
        symbols: 8,
        symbolsClock: 5,
    } as const;
    readonly digitsValue = signal(12);
    readonly digitsRotation = signal(1);
    readonly symbolsValue = signal(12);
    readonly symbolsRotation = signal(1);
    readonly symbolsClockValue = signal(12);
    readonly symbolsClockRotation = signal(1);
    readonly transitionSpeed = signal(1);
    /** Enabled on interaction only, so remount/init never tweens into pose. */
    readonly transitionsEnabled = signal(false);
    readonly isWin = computed(() =>
        this.digitsValue() === this.correctClock.digits
        && this.symbolsValue() === this.correctClock.symbols
        && this.symbolsClockValue() === this.correctClock.symbolsClock
    );
    indexes:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    rotationStep = 30;
    readonly digits: readonly ClockMark[] = [
        { value: 1, rotation: 30 },
        { value: 2, rotation: 60 },
        { value: 3, rotation: 90 },
        { value: 4, rotation: 120 },
        { value: 5, rotation: 150 },
        { value: 6, rotation: 180 },
        { value: 7, rotation: -150 },
        { value: 8, rotation: -120 },
        { value: 9, rotation: -90 },
        { value: 10, rotation: -60 },
        { value: 11, rotation: -30 },
        { value: 12, rotation: 0 },
    ];
    readonly symbols: readonly SymbolMark[] = [
        { value: 1, rotation: 30, clockRotation: -30 },
        { value: 2, rotation: 60, clockRotation: -60 },
        { value: 3, rotation: 90, clockRotation: -90 },
        { value: 4, rotation: 120, clockRotation: -120 },
        { value: 5, rotation: 150, clockRotation: -150 },
        { value: 6, rotation: 180, clockRotation: -180 },
        { value: 7, rotation: -150, clockRotation: 150 },
        { value: 8, rotation: -120, clockRotation: 120 },
        { value: 9, rotation: -90, clockRotation: 90 },
        { value: 10, rotation: -60, clockRotation: 60 },
        { value: 11, rotation: -30, clockRotation: 30 },
        { value: 12, rotation: 0, clockRotation: 0 },
    ];

    setDigitsRotation(value:number) {
        this.runWithTransitions(() => {
            const diff:number = this.getValDiff(this.digitsValue(), value);
            let rotation = 0;
            if(diff <= 6) {
                rotation = diff * this.rotationStep;
                this.digitsRotation.update((current) => current + rotation);
            }
            else {
                rotation = (12 - diff) * this.rotationStep;
                this.digitsRotation.update((current) => current - rotation);
            }
            this.digitsValue.set(value);
            this.checkWin();
        });
    }

    setSymbolsRotation(value:number) {
        this.runWithTransitions(() => {
            const diff:number = this.getValDiff(this.symbolsValue(), value);
            let rotation = 0;
            if(diff <= 6) {
                rotation = diff * this.rotationStep;
                this.symbolsRotation.update((current) => current + rotation);
            }
            else {
                rotation = (12 - diff) * this.rotationStep;
                this.symbolsRotation.update((current) => current - rotation);
            }
            this.symbolsValue.set(value);
            this.checkWin();
        });
    }

    setSymbolsClockRotation(value:number) {
        this.runWithTransitions(() => {
            const diff:number = this.getValDiff(this.symbolsClockValue(), value);
            let rotation = 0;
            let speed: number;
            if(diff <= 6) {
                speed = diff;
                rotation = diff * this.rotationStep;
                this.symbolsClockRotation.update((current) => current - rotation);
            }
            else {
                speed = 12 - diff;
                rotation = (12 - diff) * this.rotationStep;
                this.symbolsClockRotation.update((current) => current + rotation);
            }
            this.transitionSpeed.set(speed);
            this.symbolsClockValue.set(value);
            this.checkWin();
        });
    }

    /** Arm CSS transitions before the first move so remount/init never tweens. */
    private runWithTransitions(action: () => void): void {
        if (this.transitionsEnabled()) {
            action();
            return;
        }
        this.transitionsEnabled.set(true);
        requestAnimationFrame(() => action());
    }

    checkWin() {
        if (this.isWin()) {
            console.log('WIN');
        }
    }

    getValDiff(valueFrom:number, valueTo:number) {
        if(!(this.indexes.indexOf(valueFrom) >= 0) || !(this.indexes.indexOf(valueTo) >= 0))
            return -1;
        while(this.indexes[0] != valueFrom)
            this.indexes.push(this.indexes.shift()!);
        let diff = 0;
        while(this.indexes[0] != valueTo) {
            this.indexes.push(this.indexes.shift()!);
            diff += 1;
        }
        return diff;
    }
}
