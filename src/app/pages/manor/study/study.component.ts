import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-study',
    imports: [
        TopBarComponent
    ],
    templateUrl: './study.component.html',
    styleUrl: './study.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyComponent {
    pageText = "Texte d'explication de la page";
}
