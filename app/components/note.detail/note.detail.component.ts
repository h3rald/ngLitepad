import { Component, OnInit } from 'angular2/core';
import { Note } from '../../models/note'
import { RouteParams, Router, RouterLink } from 'angular2/router';
import { NoteService } from '../../services/note.service';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import marked from 'marked';

@Component({
  selector: 'note-detail',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: 'app/components/note.detail/note.detail.component.html',
  styleUrls: ['app/components/note.detail/note.detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  html: string;
  errorMessage: string;

  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._noteService.get(id).subscribe(
      note => {
        this.note = note;
        this.html = marked.parse(note.contents.toString());
      },
      error => this.errorMessage = error
    )
  }
   
  delete(){
    this._noteService.delete(this.note).subscribe(
      note => this._router.navigate(['Notes']),
      error => this.errorMessage = error
    );
  }
}