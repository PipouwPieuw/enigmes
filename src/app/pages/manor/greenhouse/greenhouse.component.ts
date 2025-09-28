import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-greenhouse',
    imports: [
        CommonModule,
        TopBarComponent
    ],
    templateUrl: './greenhouse.component.html',
    styleUrl: './greenhouse.component.scss'
})
export class GreenhouseComponent {
    pageText:string = "Texte d'explication de la page";
}
