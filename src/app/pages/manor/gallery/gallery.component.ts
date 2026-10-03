import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    signal,
    viewChildren,
} from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

interface DragSession {
    pointerId: number;
    fromSlot: number;
    startClientX: number;
    startClientY: number;
    moved: boolean;
}

@Component({
    selector: 'app-gallery',
    imports: [
        TopBarComponent
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
    private static readonly dragThresholdPx = 8;
    private static readonly swapDurationMs = 320;

    private readonly portraitSlots = viewChildren<ElementRef<HTMLElement>>('portraitSlot');

    private dragSession: DragSession | null = null;
    private suppressClick = false;
    private swapAnimationTimer: ReturnType<typeof setTimeout> | null = null;

    imgPath = 'assets/images/manor/gallery/';
    // Provisional — replace when §0/§1 design lands
    readonly correctOrder = [7, 6, 5, 4, 3, 2, 1, 0] as const;
    readonly portraits = signal([0, 1, 2, 3, 4, 5, 6, 7]);
    readonly selectedPortrait = signal(-1);
    readonly draggingSlot = signal<number | null>(null);
    readonly dropTargetSlot = signal<number | null>(null);
    readonly isAnimating = signal(false);
    readonly isWin = computed(() =>
        this.portraits().every((portrait, index) => portrait === this.correctOrder[index])
    );
    pageText = "Texte d'explication de la page";

    onPointerDown(event: PointerEvent, slotIndex: number): void {
        if (event.button !== 0 || this.isAnimating() || this.dragSession) {
            return;
        }

        const target = event.currentTarget as HTMLElement;
        target.setPointerCapture(event.pointerId);

        this.dragSession = {
            pointerId: event.pointerId,
            fromSlot: slotIndex,
            startClientX: event.clientX,
            startClientY: event.clientY,
            moved: false,
        };
    }

    onPointerMove(event: PointerEvent): void {
        const session = this.dragSession;
        if (!session || event.pointerId !== session.pointerId || this.isAnimating()) {
            return;
        }

        const dx = event.clientX - session.startClientX;
        const dy = event.clientY - session.startClientY;

        if (!session.moved) {
            if (Math.hypot(dx, dy) < GalleryComponent.dragThresholdPx) {
                return;
            }
            session.moved = true;
            this.suppressClick = true;
            this.selectedPortrait.set(-1);
            this.draggingSlot.set(session.fromSlot);
        }

        this.setInnerTransform(session.fromSlot, `translate(${dx}px, ${dy}px)`);
        this.dropTargetSlot.set(this.slotIndexFromPoint(event.clientX, event.clientY, session.fromSlot));
    }

    onPointerUp(event: PointerEvent): void {
        const session = this.dragSession;
        if (!session || event.pointerId !== session.pointerId) {
            return;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
        }

        const fromSlot = session.fromSlot;
        const moved = session.moved;
        const dx = event.clientX - session.startClientX;
        const dy = event.clientY - session.startClientY;
        const dropSlot = moved
            ? this.slotIndexFromPoint(event.clientX, event.clientY, fromSlot)
            : null;

        this.dragSession = null;

        if (!moved) {
            return;
        }

        if (dropSlot === null) {
            const inner = this.slotInner(fromSlot);
            if (inner) {
                inner.style.transition = 'transform 180ms ease-in-out';
                inner.style.transform = 'translate(0px, 0px)';
                setTimeout(() => this.clearInnerTransform(fromSlot), 180);
            } else {
                this.clearInnerTransform(fromSlot);
            }
            this.resetDragState();
            return;
        }

        this.animateSwap(fromSlot, dropSlot, { x: dx, y: dy });
    }

    onPointerCancel(event: PointerEvent): void {
        const session = this.dragSession;
        if (!session || event.pointerId !== session.pointerId) {
            return;
        }

        const fromSlot = session.fromSlot;
        this.dragSession = null;
        this.clearInnerTransform(fromSlot);
        this.resetDragState();
    }

    onPortraitClick(portraitId: number): void {
        if (this.suppressClick) {
            this.suppressClick = false;
            return;
        }
        if (this.isAnimating() || this.draggingSlot() !== null) {
            return;
        }
        this.selectPortrait(portraitId);
    }

    selectPortrait(index: number): void {
        if (this.selectedPortrait() === index) {
            this.selectedPortrait.set(-1);
            return;
        }

        if (this.selectedPortrait() === -1) {
            this.selectedPortrait.set(index);
            return;
        }

        const selected = this.selectedPortrait();
        this.portraits.update((portraits) => {
            const next = [...portraits];
            const firstIndex = next.findIndex((element) => element === selected);
            const secondIndex = next.findIndex((element) => element === index);
            next[firstIndex] = next.splice(secondIndex, 1, next[firstIndex])[0];
            return next;
        });
        this.selectedPortrait.set(-1);

        if (this.isWin()) {
            console.log('WIN');
        }
    }

    private slotInner(slotIndex: number): HTMLElement | null {
        return this.portraitSlots()[slotIndex]?.nativeElement
            .querySelector<HTMLElement>('.app_gallery__portrait_inner') ?? null;
    }

    private setInnerTransform(slotIndex: number, transform: string): void {
        const inner = this.slotInner(slotIndex);
        if (inner) {
            inner.style.transform = transform;
        }
    }

    private clearInnerTransform(slotIndex: number): void {
        const inner = this.slotInner(slotIndex);
        if (inner) {
            inner.style.transition = '';
            inner.style.transform = '';
            inner.style.zIndex = '';
        }
    }

    private slotIndexFromPoint(clientX: number, clientY: number, excludeSlot: number): number | null {
        const elements = document.elementsFromPoint(clientX, clientY);
        for (const element of elements) {
            if (!(element instanceof HTMLElement)) {
                continue;
            }
            const slotEl = element.closest('[data-slot-index]');
            if (!(slotEl instanceof HTMLElement)) {
                continue;
            }
            const slotIndex = Number(slotEl.dataset['slotIndex']);
            if (Number.isInteger(slotIndex) && slotIndex !== excludeSlot) {
                return slotIndex;
            }
        }
        return null;
    }

    private animateSwap(
        fromSlot: number,
        toSlot: number,
        dragOffset: { x: number; y: number },
    ): void {
        const slots = this.portraitSlots();
        const fromSlotEl = slots[fromSlot]?.nativeElement;
        const toSlotEl = slots[toSlot]?.nativeElement;
        const fromInner = this.slotInner(fromSlot);
        const toInner = this.slotInner(toSlot);

        if (!fromSlotEl || !toSlotEl || !fromInner || !toInner) {
            this.commitSwap(fromSlot, toSlot);
            this.clearInnerTransform(fromSlot);
            this.clearInnerTransform(toSlot);
            this.resetDragState();
            return;
        }

        this.isAnimating.set(true);
        this.draggingSlot.set(null);
        this.dropTargetSlot.set(null);

        const fromRect = fromSlotEl.getBoundingClientRect();
        const toRect = toSlotEl.getBoundingClientRect();

        const fromEndX = toRect.left - fromRect.left;
        const fromEndY = toRect.top - fromRect.top;
        const toEndX = fromRect.left - toRect.left;
        const toEndY = fromRect.top - toRect.top;

        fromInner.style.transition = 'none';
        toInner.style.transition = 'none';
        fromInner.style.transform = `translate(${dragOffset.x}px, ${dragOffset.y}px)`;
        toInner.style.transform = 'translate(0px, 0px)';
        fromInner.style.zIndex = '2';
        toInner.style.zIndex = '1';

        // Force layout so the browser registers the pre-animation transform.
        fromInner.getBoundingClientRect();

        const duration = GalleryComponent.swapDurationMs;
        fromInner.style.transition = `transform ${duration}ms ease-in-out`;
        toInner.style.transition = `transform ${duration}ms ease-in-out`;
        fromInner.style.transform = `translate(${fromEndX}px, ${fromEndY}px)`;
        toInner.style.transform = `translate(${toEndX}px, ${toEndY}px)`;

        if (this.swapAnimationTimer !== null) {
            clearTimeout(this.swapAnimationTimer);
        }

        this.swapAnimationTimer = setTimeout(() => {
            this.clearInnerTransform(fromSlot);
            this.clearInnerTransform(toSlot);
            this.commitSwap(fromSlot, toSlot);
            this.resetDragState();
            this.isAnimating.set(false);
            this.swapAnimationTimer = null;
        }, duration);
    }

    private commitSwap(fromSlot: number, toSlot: number): void {
        this.portraits.update((portraits) => {
            const next = [...portraits];
            const tmp = next[fromSlot];
            next[fromSlot] = next[toSlot];
            next[toSlot] = tmp;
            return next;
        });
        this.selectedPortrait.set(-1);

        if (this.isWin()) {
            console.log('WIN');
        }
    }

    private resetDragState(): void {
        this.draggingSlot.set(null);
        this.dropTargetSlot.set(null);
    }
}
