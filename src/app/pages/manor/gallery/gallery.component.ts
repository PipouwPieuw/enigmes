import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-gallery',
    imports: [
        CommonModule,
        TopBarComponent
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
    imgPath:string = '/assets/images/manor/gallery/';
    portraits = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ];
    selectedPortrait:number = -1;
    pageText:string = "Texte d'explication de la page";

    selectPortrait(index:number) {
        // Unselect portrait if clicked a second time
        if(this.selectedPortrait == index) {
            this.selectedPortrait = -1;
            return;
        }
        // Select clicked portrait
        if(this.selectedPortrait == -1) {
            this.selectedPortrait = index;
            return;
        }
        // Switch portraits
        console.log('Valeur 1 : ' + this.selectedPortrait);
        console.log('Valeur 2 : ' + index);
        var firstIndex = this.portraits.findIndex((element) => element == this.selectedPortrait);
        var secondIndex = this.portraits.findIndex((element) => element == index);
        console.log('Inversion de l\'index ' + firstIndex + ' avec l\index ' + secondIndex);
        this.portraits[firstIndex] = this.portraits.splice(secondIndex, 1, this.portraits[firstIndex])[0];
        this.selectedPortrait = -1;
    }
}
