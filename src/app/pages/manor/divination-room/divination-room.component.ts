import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-divination-room',
    imports: [
        TopBarComponent
    ],
    templateUrl: './divination-room.component.html',
    styleUrl: './divination-room.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivinationRoomComponent {
    pageText = "Texte d'explication de la page";
}
