import { Routes } from '@angular/router';

import { MapComponent } from './pages/manor/map/map.component';
import { ArtRoomComponent } from './pages/manor/art-room/art-room.component';
import { MusicRoomComponent } from './pages/manor/music-room/music-room.component';
import { GalleryComponent } from './pages/manor/gallery/gallery.component';
import { GreenhouseComponent } from './pages/manor/greenhouse/greenhouse.component';

export const routes: Routes = [
	{
	    path: 'manoir/carte',
	    title: 'Carte',
	    component: MapComponent,
	},
	{
	    path: 'manoir/atelier-d-arts',
	    title: 'Atelier d\'Art',
	    component: ArtRoomComponent,
	},
	{
	    path: 'manoir/salle-de-musique',
	    title: 'Salle de musique',
	    component: MusicRoomComponent,
	},
	{
	    path: 'manoir/galerie',
	    title: 'Galerie',
	    component: GalleryComponent,
	},
	{
	    path: 'manoir/greenhouse',
	    title: 'Greenhouse',
	    component: GreenhouseComponent,
	}
];
