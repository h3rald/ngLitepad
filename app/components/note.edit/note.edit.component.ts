import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router, RouterLink } from 'angular2/router';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { MarkdownEditor } from '../markdown.editor/markdown.editor.component';

@Component({
  selector: 'edit-note',
  directives: [MATERIAL_DIRECTIVES, RouterLink, MarkdownEditor],
  templateUrl: 'app/components/note.edit/note.edit.component.html',
  styleUrls: ['app/components/note.edit/note.edit.component.css']
})
export class EditNoteComponent implements OnInit {
  
  note: Note;
  updatedContents: string;
  errorMessage: string;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _routeParams: RouteParams
  ){ }
  
  ngOnInit() {
    let id = this._routeParams.get('id');
    this._noteService.get(id).subscribe(
      note => {
        this.note = note;
        this.updatedContents = note.contents;
      },
      error => this.errorMessage = error
    )
  }
  
  updateContents(contents){
    this.updatedContents = contents;
  }
  
  save(){
    this.note.contents = this.updatedContents;
    this._noteService.update(this.note).subscribe(
      note => this._router.navigate(['NoteDetail', {id: note.id}]),
      error => this.errorMessage = error
    )
  }
  
}