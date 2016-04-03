import { Component, OnInit } from 'angular2/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { Router } from 'angular2/router';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private _noteService: NoteService,
    private _router: Router) {
  }

  ngOnInit() {
    this._noteService.getNotes()
      .then(notes => this.notes = notes.slice(1, 3));
  }

  goToDetail(note: Note) {
    let link = ['NoteDetail', { id: note.id }];
    this._router.navigate(link);
  }

}