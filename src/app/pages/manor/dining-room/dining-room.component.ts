import { Component } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-dining-room',
    imports: [
        CommonModule,
        TopBarComponent
    ],
    templateUrl: './dining-room.component.html',
    styleUrl: './dining-room.component.scss'
})
export class DiningRoomComponent {
    imgPath:string = '/assets/images/manor/dining-room/';
    pageText:string = "Texte d'explication de la page";
    digitsRotation = 0;
    symbolsRotation = 0;
    digits:object = {
        1: {
            'value': 1,
            'rotation': 30
        },
        2: {
            'value': 2,
            'rotation': 60
        },
        3: {
            'value': 3,
            'rotation': 90
        },
        4: {
            'value': 4,
            'rotation': 120
        },
        5: {
            'value': 5,
            'rotation': 150
        },
        6: {
            'value': 6,
            'rotation': 180
        },
        7: {
            'value': 7,
            'rotation': -150
        },
        8: {
            'value': 8,
            'rotation': -120
        },
        9: {
            'value': 9,
            'rotation': -90
        },
        10: {
            'value': 10,
            'rotation': -60
        },
        11: {
            'value': 11,
            'rotation': -30
        },
        12: {
            'value': 12,
            'rotation': 0
        }
    };
    symbols:object = {
        1: {
            'value': 1,
            'rotation': -15
        },
        2: {
            'value': 2,
            'rotation': 15
        },
        3: {
            'value': 3,
            'rotation': 45
        },
        4: {
            'value': 4,
            'rotation': 75
        },
        5: {
            'value': 5,
            'rotation': 105
        },
        6: {
            'value': 6,
            'rotation': 135
        },
        7: {
            'value': 7,
            'rotation': 165
        },
        8: {
            'value': 8,
            'rotation': -165
        },
        9: {
            'value': 9,
            'rotation': -135
        },
        10: {
            'value': 10,
            'rotation': -105
        },
        11: {
            'value': 11,
            'rotation': -75
        },
        12: {
            'value': 12,
            'rotation': -45
        }
    };

    setDigitsRotation(value:number) {
        this.digitsRotation = value;
    }

    setSymbolsRotation(value:number) {
        this.symbolsRotation = value;
    }
}
