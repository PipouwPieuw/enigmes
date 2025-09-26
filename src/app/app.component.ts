import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  

import { MapComponent } from './pages/manor/map/map.component';
import { ArtRoomComponent } from './pages/manor/art-room/art-room.component';
import { MusicRoomComponent } from './pages/manor/music-room/music-room.component';
import { GalleryComponent } from './pages/manor/gallery/gallery.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        CommonModule,
        // MapComponent,
        // ArtRoomComponent,
        // MusicRoomComponent,
        // GalleryComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'enigmes';
}
