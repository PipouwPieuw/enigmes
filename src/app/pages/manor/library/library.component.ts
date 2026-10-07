import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-library',
    imports: [
        TopBarComponent
    ],
    templateUrl: './library.component.html',
    styleUrl: './library.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent {
    pageText = "Texte d'explication de la page";
}
