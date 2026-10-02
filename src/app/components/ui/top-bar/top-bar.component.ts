import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-top-bar',
    imports: [
        CommonModule,
        RouterLink,
        ModalComponent,
    ],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
    @Input() backLink: string = '';
    @Input() pageText: string = '';
}
