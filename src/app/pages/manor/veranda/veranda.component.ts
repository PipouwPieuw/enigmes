import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-veranda',
    imports: [
        TopBarComponent
    ],
    templateUrl: './veranda.component.html',
    styleUrl: './veranda.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerandaComponent {
    pageText = "Texte d'explication de la page";
}
