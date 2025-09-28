import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeyValue} from '@angular/common';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-map',
    imports: [
        CommonModule,
        TopBarComponent
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent {
    imgPath:string = '/assets/images/manor/map/';
    rooms:object = {
        0: {
            'name': 'Salle de musique',
            'href': '/manoir/salle-de-musique',
            'posX': '11.8%',
            'posY': '17%',
            'width': '13%',
            'height': '37%'
        },
        1: {
            'name': 'Atelier d\'Arts',
            'href': '/manoir/atelier-d-arts',
            'posX': '71%',
            'posY': '23%',
            'width': '14%',
            'height': '18%'
        },
        2: {
            'name': 'Galerie',
            'href': '/manoir/galerie',
            'posX': '85.5%',
            'posY': '23%',
            'width': '7%',
            'height': '18%'
        }
    };
    pageText:string = "Texte d'explication de la page";
}