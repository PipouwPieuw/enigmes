import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
    selector: 'app-modal',
    imports: [
        CommonModule,
        A11yModule,
    ],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @Input() text: string = '';
    @ViewChild('toggleButton') toggleButton?: ElementRef<HTMLButtonElement>;
    isDisplayed: boolean = false;
    readonly descriptionId = 'app-modal-description';

    toggleModal() {
        if (this.isDisplayed) {
            this.closeModal();
        } else {
            this.isDisplayed = true;
        }
    }

    closeModal() {
        if (!this.isDisplayed) {
            return;
        }
        this.isDisplayed = false;
        setTimeout(() => {
            this.toggleButton?.nativeElement.focus();
        });
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.isDisplayed) {
            this.closeModal();
        }
    }
}
