import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-art-room',
    imports: [
        TopBarComponent
    ],
    templateUrl: './art-room.component.html',
    styleUrl: './art-room.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtRoomComponent {
    imgPath = 'assets/images/manor/art-room/';
    pageCount = 0;
    maxPages = 4;
    magnified = false;
    magnifiedIndex = 1;
    pageText = "Texte d'explication de la page";

    isOpen() {
        return this.pageCount > 0 && this.pageCount <= this.maxPages;
    }

    incrementPageCount() {
        this.pageCount += 1;
    }

    decrementPageCount() {
        this.pageCount -= 1;
    }

    magnifyImage(index:number) {
        this.magnifiedIndex = index;
        this.magnified = true;
    }

    unmagnifyImage() {
        this.magnified = false;
    }
}
