import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    imports: [
        CommonModule
    ],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @Input() text: string = '';
    isDisplayed: boolean = false;

    toggleModal() {
        this.isDisplayed = !this.isDisplayed;
    }
}
