import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-kitchen',
    imports: [
        TopBarComponent
    ],
    templateUrl: './kitchen.component.html',
    styleUrl: './kitchen.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenComponent {
    pageText = "Texte d'explication de la page";
}
