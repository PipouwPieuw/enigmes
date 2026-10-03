import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-top-bar',
    imports: [
        RouterLink,
        ModalComponent,
    ],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
    backLink = input('');
    pageText = input('');
}
