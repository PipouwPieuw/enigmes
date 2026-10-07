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
	    path: 'manoir/atelier-d-art',
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
	    path: 'manoir/veranda',
	    title: 'Véranda',
	    loadComponent: () =>
	        import('./pages/manor/veranda/veranda.component').then((m) => m.VerandaComponent),
	},
	{
	    path: 'manoir/salle-a-manger',
	    title: 'Salle à manger',
	    loadComponent: () =>
	        import('./pages/manor/dining-room/dining-room.component').then((m) => m.DiningRoomComponent),
	},
	{
	    path: 'manoir/bibliotheque',
	    title: 'Bibliothèque',
	    loadComponent: () =>
	        import('./pages/manor/library/library.component').then((m) => m.LibraryComponent),
	},
	{
	    path: 'manoir/cuisine',
	    title: 'Cuisine',
	    loadComponent: () =>
	        import('./pages/manor/kitchen/kitchen.component').then((m) => m.KitchenComponent),
	},
	{
	    path: 'manoir/salle-de-divination',
	    title: 'Salle de divination',
	    loadComponent: () =>
	        import('./pages/manor/divination-room/divination-room.component').then((m) => m.DivinationRoomComponent),
	},
	{
	    path: 'manoir/bureau',
	    title: 'Bureau',
	    loadComponent: () =>
	        import('./pages/manor/study/study.component').then((m) => m.StudyComponent),
	},
	{
	    path: 'manoir/serre',
	    pathMatch: 'full',
	    redirectTo: 'manoir/veranda',
	},
	{
	    path: 'manoir/greenhouse',
	    pathMatch: 'full',
	    redirectTo: 'manoir/veranda',
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
