import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

interface MapRoom {
    name: string;
    route: string;
    posX: string;
    posY: string;
    width: string;
    height: string;
}

@Component({
    selector: 'app-map',
    imports: [
        RouterLink,
        TopBarComponent
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
    imgPath = 'assets/images/manor/map/';
    rooms: MapRoom[] = [
        {
            name: 'Salle de musique',
            route: '/manoir/salle-de-musique',
            posX: '11.8%',
            posY: '17%',
            width: '13%',
            height: '37%'
        },
        {
            name: 'Atelier d\'Arts',
            route: '/manoir/atelier-d-arts',
            posX: '71%',
            posY: '23%',
            width: '14%',
            height: '18%'
        },
        {
            name: 'Galerie',
            route: '/manoir/galerie',
            posX: '85.5%',
            posY: '23%',
            width: '7%',
            height: '18%'
        },
        {
            name: 'Véranda',
            route: '/manoir/veranda',
            posX: '27%',
            posY: '0%',
            width: '27%',
            height: '23%'
        },
        {
            name: 'Salle à manger',
            route: '/manoir/salle-a-manger',
            posX: '37%',
            posY: '53%',
            width: '18%',
            height: '20%'
        }
    ];
    pageText = "Texte d'explication de la page";
}
