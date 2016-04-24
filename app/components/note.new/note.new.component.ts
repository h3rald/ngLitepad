import { Component, Input } from 'angular2/core';
import { Router, RouterLink} from 'angular2/router';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { MarkdownEditor } from '../markdown.editor/markdown.editor.component';

@Component({
  selector: 'new-note',
  directives: [MATERIAL_DIRECTIVES, RouterLink, MarkdownEditor],
  templateUrl: 'app/components/note.new/note.new.component.html',
  styleUrls: ['app/components/note.new/note.new.component.css']
})
export class NewNoteComponent {
  
  @Input() note: Note;
  errorMessage: string;
  updatedContents: string;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router
  ){
    this.note = new Note();
  }
  
  updateContents(contents){
    this.updatedContents = contents;
  }
  
  create(){
    this.note.contents = this.updatedContents;
    this._noteService.create(this.note).subscribe(
      note => this._router.navigate(['NoteDetail', {id: note.id}]),
      error => this.errorMessage = error
    )
  }
  
}