import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from '../../../components/ui/top-bar/top-bar.component';

@Component({
    selector: 'app-music-room',
    imports: [
        CommonModule,
        TopBarComponent
    ],
    templateUrl: './music-room.component.html',
    styleUrl: './music-room.component.scss'
})
export class MusicRoomComponent {
    soundsAmount:number = 17;
    chordsAmount:number = 8;
    playingSound:number = 0;
    audio = new Audio();
    activeKeys:Set<number> = new Set();
    activeChords:Set<number> = new Set();
    chords:object = {
        0: [2,8,13], // ladder
        1: [4,9,12], //pillar
        2: [6,12,17], // bed
        3: [10,14,16], // boat
        4: [5,7,15], // door
        5: [1,6,16], // skull
        6: [3,12,14], // rudder
        7: [2,11,13] // chimney
    };
    icons = [
        "ladder",
        "pillar",
        "bed",
        "boat",
        "door",
        "skull",
        "rudder",
        "chimney"
    ];
    pageText:string = "Texte d'explication de la page";

    keyPressed(index:number) {
        var self = this;
        if(this.activeKeys.has(index)) {
            this.activeKeys.delete(index);
            if(this.playingSound == index) {
                this.playingSound == 0;
                this.audio.pause();
            }
        }
        else {
            this.activeKeys.add(index);
            this.playingSound = index;
            this.audio.src = '/assets/sound/manor/music-room/' + index + '.wav';
            this.audio.load();
            this.audio.play();
            this.audio.onended = function() {
                self.playingSound = 0;
            };
        }
        this.checkChord();
    }

    checkChord() {
        var keys = Array.from(this.activeKeys);
        for(var chord in this.chords) {
            if(this.compareSets(this.chords[chord as keyof object], keys) && !this.activeChords.has(+chord)) {
                this.activeChords.add(+chord);
                this.activeKeys.clear();
            }
        }
        if(this.activeChords.size == this.chordsAmount) {
            console.log("WIN");
        }
    }

    compareSets(set1:Array<number>, set2:Array<number>) {
        if(set1.length != set2.length)
            return false;
        for(var i in set1)
            if(!set2.includes(set1[i]))
                return false;
        return true;
    }
}
