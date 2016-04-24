import { Component, Input } from 'angular2/core';
import { Router, RouterLink} from 'angular2/router';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({
  selector: 'new-note',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: 'app/components/note.new/note.new.component.html',
  styleUrls: ['app/components/note.new/note.new.component.css']
})
export class NewNoteComponent {
  
  @Input() note: Note;
  errorMessage: string;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router
  ){
    this.note = new Note();
  }
  
  create(){
    this._noteService.create(this.note).subscribe(
      note => this._router.navigate(['NoteDetail', {id: note.id}]),
      error => this.errorMessage = error
    )
  }
  
}