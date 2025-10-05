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
    digitsValue = 12;
    digitsRotation = 1;
    symbolsValue = 12;
    symbolsRotation = 1;
    symbolsClockValue = 12;
    symbolsClockRotation = 1;
    indexes:any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    rotationStep:number = 30;
    transitionSpeed:number = 1;
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
            'rotation': 30,
            'clockRotation': -30
        },
        2: {
            'value': 2,
            'rotation': 60,
            'clockRotation': -60
        },
        3: {
            'value': 3,
            'rotation': 90,
            'clockRotation': -90
        },
        4: {
            'value': 4,
            'rotation': 120,
            'clockRotation': -120
        },
        5: {
            'value': 5,
            'rotation': 150,
            'clockRotation': -150
        },
        6: {
            'value': 6,
            'rotation': 180,
            'clockRotation': -180
        },
        7: {
            'value': 7,
            'rotation': -150,
            'clockRotation': 150
        },
        8: {
            'value': 8,
            'rotation': -120,
            'clockRotation': 120
        },
        9: {
            'value': 9,
            'rotation': -90,
            'clockRotation': 90
        },
        10: {
            'value': 10,
            'rotation': -60,
            'clockRotation': 60
        },
        11: {
            'value': 11,
            'rotation': -30,
            'clockRotation': 30
        },
        12: {
            'value': 12,
            'rotation': 0,
            'clockRotation': 0
        }
    };

    setDigitsRotation(value:number) {
        var diff:number = this.getValDiff(this.digitsValue, value);
        var rotation:number = 0;
        if(diff <= 6) {
            rotation = diff * this.rotationStep;
            this.digitsRotation += rotation;
        }
        else {
            rotation = (12 - diff) * this.rotationStep;
            this.digitsRotation -= rotation;
        }
        this.digitsValue = value;
    }

    setSymbolsRotation(value:number) {
        var diff:number = this.getValDiff(this.symbolsValue, value);
        var rotation:number = 0;
        if(diff <= 6) {
            rotation = diff * this.rotationStep;
            this.symbolsRotation += rotation;
        }
        else {
            rotation = (12 - diff) * this.rotationStep;
            this.symbolsRotation -= rotation;
        }
        this.symbolsValue = value;
    }

    setSymbolsClockRotation(value:number) {
        var diff:number = this.getValDiff(this.symbolsClockValue, value);
        var rotation:number = 0;
        var speed = 0;
        if(diff <= 6) {
            speed = diff;
            rotation = diff * this.rotationStep;
            this.symbolsClockRotation -= rotation;
        }
        else {
            speed = 12 - diff;
            rotation = (12 - diff) * this.rotationStep;
            this.symbolsClockRotation += rotation;
        }
        this.transitionSpeed = speed;
        this.symbolsClockValue = value;
    }

    getValDiff(valueFrom:number, valueTo:number) {
        if(!(this.indexes.indexOf(valueFrom) >= 0) || !(this.indexes.indexOf(valueTo) >= 0))
            return -1;
        while(this.indexes[0] != valueFrom)
            this.indexes.push(this.indexes.shift());
        var diff = 0;
        while(this.indexes[0] != valueTo) {
            this.indexes.push(this.indexes.shift());
            diff += 1;
        }
        return diff;
    }
}
