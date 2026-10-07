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
            name: 'Atelier d\'Art',
            route: '/manoir/atelier-d-art',
            posX: '71%',
            posY: '23%',
            width: '13.5%',
            height: '18%'
        },
        {
            name: 'Galerie',
            route: '/manoir/galerie',
            posX: '85.5%',
            posY: '23%',
            width: '6.5%',
            height: '27%'
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
        },
        {
            name: 'Bibliothèque',
            route: '/manoir/bibliotheque',
            posX: '11.8%',
            posY: '55%',
            width: '13%',
            height: '28%'
        },
        {
            name: 'Cuisine',
            route: '/manoir/cuisine',
            posX: '44.5%',
            posY: '26%',
            width: '10.5%',
            height: '16%'
        },
        {
            name: 'Salle de divination',
            route: '/manoir/salle-de-divination',
            posX: '56%',
            posY: '17%',
            width: '13.5%',
            height: '14%'
        },
        {
            name: 'Bureau',
            route: '/manoir/bureau',
            posX: '56%',
            posY: '66.5%',
            width: '13.5%',
            height: '16%'
        }
    ];
    pageText = "Texte d'explication de la page";
}
