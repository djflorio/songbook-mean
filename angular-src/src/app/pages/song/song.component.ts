import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SongService } from '../../services/song.service';
import { Song, Block, ParsedLine, ParsedSection, ParsedSong } from '../../models/song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Song;
  id: string;
  sections: ParsedSection[] = [];
  editing: boolean = false;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getSong(this.id);
    });
  }

  getSong(songId: string) {
    this.songService.getSongById(this.id)
      .subscribe(song => { 
        this.song = song.song;
        this.parseSong(song.song);
      });
  }

  parseSong(song: Song) {
    for (var i = 0; i < song.sections.length; i++) {
      var linesData = song.sections[i].lines;
      var lines: ParsedLine[] = [];
      for (var j = 0; j < linesData.length; j++) {
        var chordArray = linesData[j].chords.split("|");
        var wordArray = linesData[j].words.split("|");
        var blocks: Block[] = [];
        for (var k = 0; k < chordArray.length; k++) {
          blocks.push({
            chord: chordArray[k],
            word: wordArray[k]
          });
        }
        lines.push({ blocks });
      }
      var section: ParsedSection = {lines};
      this.sections.push(section);
    }
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

}
