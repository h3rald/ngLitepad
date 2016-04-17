import { Component, OnInit } from 'angular2/core';
import { Note } from '../../models/note'
import { RouteParams } from 'angular2/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'note-detail',
  templateUrl: 'app/components/note.detail/note.detail.component.html',
  styleUrls: ['app/components/note.detail/note.detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  errorMessage: string;

  constructor(
    private _noteService: NoteService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._noteService.get(id).subscribe(
      note => this.note = note,
      error => this.errorMessage = error
    )
  }

  goBack() {
    window.history.back();
  }
   
  deleteNote(){
    this._noteService.delete(this.note).subscribe(
      note => this.goBack(),
      error => this.errorMessage = error
    );
  }
}