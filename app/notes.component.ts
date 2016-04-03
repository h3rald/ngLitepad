import {Component} from 'angular2/core';
import {Note} from './note';
import {NoteDetailComponent} from './note.detail.component';
import {NoteService} from './note.service';
import {OnInit} from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
  selector: 'notes',
  templateUrl : 'app/notes.component.html' ,
  styleUrls:['app/notes.component.css'],
directives: [NoteDetailComponent],
})
export class NotesComponent implements OnInit {
  title = 'LitePad';
  selectedNote: Note;
  public notes;
  
  constructor(
    private _NoteService: NoteService,
    private _router: Router){ };
  
  ngOnInit() {
    this.getNotes();
  }
  
  onSelect(note: Note){
    this.selectedNote = note;
  }
  
  getNotes(){
    this._NoteService.getNotesSlowly().then(notes => this.notes = notes);
  }
  
  goToDetail(){
    this._router.navigate(['NoteDetail', {id: this.selectedNote.id}]);
  }
}