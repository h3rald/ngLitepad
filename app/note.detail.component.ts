import { Component, Input, OnInit } from 'angular2/core';
import { Note } from './note'
import { RouteParams } from 'angular2/router';
import { NoteService } from './note.service';

@Component({
  selector: 'note-detail',
  templateUrl: '/app/note.detail.component.html',
  styleUrls: ['app/note.detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() note: Note

  constructor(
    private _noteService: NoteService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._noteService.getNote(id)
      .then(note => this.note = note);
  }

  goBack() {
    window.history.back();
  }
}