import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-greenhouse',
    imports: [
        TopBarComponent
    ],
    templateUrl: './greenhouse.component.html',
    styleUrl: './greenhouse.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreenhouseComponent {
    pageText = "Texte d'explication de la page";
}
