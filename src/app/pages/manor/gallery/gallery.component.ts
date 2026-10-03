import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-gallery',
    imports: [
        TopBarComponent
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
    imgPath = 'assets/images/manor/gallery/';
    // Provisional — replace when §0/§1 design lands
    readonly correctOrder = [7, 6, 5, 4, 3, 2, 1, 0] as const;
    readonly portraits = signal([0, 1, 2, 3, 4, 5, 6, 7]);
    readonly selectedPortrait = signal(-1);
    readonly isWin = computed(() =>
        this.portraits().every((portrait, index) => portrait === this.correctOrder[index])
    );
    pageText = "Texte d'explication de la page";

    selectPortrait(index:number) {
        // Unselect portrait if clicked a second time
        if(this.selectedPortrait() == index) {
            this.selectedPortrait.set(-1);
            return;
        }
        // Select clicked portrait
        if(this.selectedPortrait() == -1) {
            this.selectedPortrait.set(index);
            return;
        }
        // Switch portraits
        console.log('Valeur 1 : ' + this.selectedPortrait());
        console.log('Valeur 2 : ' + index);
        const selected = this.selectedPortrait();
        this.portraits.update((portraits) => {
            const next = [...portraits];
            const firstIndex = next.findIndex((element) => element == selected);
            const secondIndex = next.findIndex((element) => element == index);
            console.log('Inversion de l\'index ' + firstIndex + ' avec l\'index ' + secondIndex);
            next[firstIndex] = next.splice(secondIndex, 1, next[firstIndex])[0];
            return next;
        });
        this.selectedPortrait.set(-1);
        if (this.isWin()) {
            console.log('WIN');
        }
    }
}
