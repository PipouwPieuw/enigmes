import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-art-room',
    imports: [CommonModule],
    templateUrl: './art-room.component.html',
    styleUrl: './art-room.component.scss'
})
export class ArtRoomComponent {
    imgPath:string = '/assets/images/manor/art-room/';
    pageCount:number = 0;
    maxPages:number = 4;
    magnified:boolean = false;
    magnifiedIndex:number = 1;

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
