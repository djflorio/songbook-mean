import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { Song } from '../../models/song';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  songs: Song[];

  constructor(private userService: UserService, private songService: SongService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getSongsForUser();
  }

  getSongsForUser() {
    this.songService.getByUserId(this.currentUser._id)
      .subscribe(songs => { this.songs = songs.songs; });
  }

}