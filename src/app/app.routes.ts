import { Routes } from '@angular/router';

export const routes: Routes = [
	{
	    path: '',
	    pathMatch: 'full',
	    redirectTo: 'manoir/carte',
	},
	{
	    path: 'manoir/carte',
	    title: 'Carte',
	    loadComponent: () =>
	        import('./pages/manor/map/map.component').then((m) => m.MapComponent),
	},
	{
	    path: 'manoir/atelier-d-arts',
	    title: 'Atelier d\'Art',
	    loadComponent: () =>
	        import('./pages/manor/art-room/art-room.component').then((m) => m.ArtRoomComponent),
	},
	{
	    path: 'manoir/salle-de-musique',
	    title: 'Salle de musique',
	    loadComponent: () =>
	        import('./pages/manor/music-room/music-room.component').then((m) => m.MusicRoomComponent),
	},
	{
	    path: 'manoir/galerie',
	    title: 'Galerie',
	    loadComponent: () =>
	        import('./pages/manor/gallery/gallery.component').then((m) => m.GalleryComponent),
	},
	{
	    path: 'manoir/serre',
	    title: 'Serre',
	    loadComponent: () =>
	        import('./pages/manor/greenhouse/greenhouse.component').then((m) => m.GreenhouseComponent),
	},
	{
	    path: 'manoir/salle-a-manger',
	    title: 'Salle à manger',
	    loadComponent: () =>
	        import('./pages/manor/dining-room/dining-room.component').then((m) => m.DiningRoomComponent),
	},
	{
	    path: 'manoir/greenhouse',
	    pathMatch: 'full',
	    redirectTo: 'manoir/serre',
	},
	{
	    path: 'manoir/dining-room',
	    pathMatch: 'full',
	    redirectTo: 'manoir/salle-a-manger',
	},
	{
	    path: '**',
	    redirectTo: 'manoir/carte',
	},
];
