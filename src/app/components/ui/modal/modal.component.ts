import { ChangeDetectionStrategy, Component, ElementRef, HostListener, input, signal, ViewChild } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
    selector: 'app-modal',
    imports: [
        A11yModule,
    ],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
    text = input('');
    @ViewChild('toggleButton') toggleButton?: ElementRef<HTMLButtonElement>;
    readonly isDisplayed = signal(false);
    readonly descriptionId = 'app-modal-description';

    toggleModal() {
        if (this.isDisplayed()) {
            this.closeModal();
        } else {
            this.isDisplayed.set(true);
        }
    }

    closeModal() {
        if (!this.isDisplayed()) {
            return;
        }
        this.isDisplayed.set(false);
        setTimeout(() => {
            this.toggleButton?.nativeElement.focus();
        });
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.isDisplayed()) {
            this.closeModal();
        }
    }
}
