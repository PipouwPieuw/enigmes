import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-top-bar',
    imports: [
        CommonModule,
        ModalComponent,
    ],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
    @Input() backLink: string = '';
    @Input() pageText: string = '';
}
