import { Component } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-map',
    imports: [
        CommonModule,
        RouterLink,
        TopBarComponent
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent {
    imgPath:string = 'assets/images/manor/map/';
    rooms:object = {
        0: {
            'name': 'Salle de musique',
            'route': '/manoir/salle-de-musique',
            'posX': '11.8%',
            'posY': '17%',
            'width': '13%',
            'height': '37%'
        },
        1: {
            'name': 'Atelier d\'Arts',
            'route': '/manoir/atelier-d-arts',
            'posX': '71%',
            'posY': '23%',
            'width': '14%',
            'height': '18%'
        },
        2: {
            'name': 'Galerie',
            'route': '/manoir/galerie',
            'posX': '85.5%',
            'posY': '23%',
            'width': '7%',
            'height': '18%'
        },
        3: {
            'name': 'Serre',
            'route': '/manoir/greenhouse',
            'posX': '27%',
            'posY': '0%',
            'width': '27%',
            'height': '23%'
        },
        4: {
            'name': 'Salle à manger',
            'route': '/manoir/dining-room',
            'posX': '37%',
            'posY': '53%',
            'width': '18%',
            'height': '20%'
        }
    };
    pageText:string = "Texte d'explication de la page";
}