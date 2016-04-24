import {Component} from 'angular2/core';
import {Note} from '../../models/note';
import {NoteDetailComponent} from '../note.detail/note.detail.component';
import {NoteService} from '../../services/note.service';
import {OnInit} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { MATERIAL_DIRECTIVES, ITableSelectableRowSelectionChange } from 'ng2-material/all';

@Component({
  selector: 'notes',
  templateUrl : 'app/components/notes/notes.component.html' ,
  styleUrls:['app/components/notes/notes.component.css'],
directives: [NoteDetailComponent, MATERIAL_DIRECTIVES, RouterLink],
})
export class NotesComponent implements OnInit {
  selectedNotes: Array<string> = [];
  public notes: Array<Note>;
  public errorMessage;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router){ };
  
  ngOnInit() {
    this.getNotes();
  }
  
  onSelect(data: ITableSelectableRowSelectionChange){
    if (data.isActive && this.selectedNotes.indexOf(data.selectableValue) < 0){
      this.selectedNotes.push(data.selectableValue);
    } else if (!data.isActive && this.selectedNotes.indexOf(data.selectableValue) >= 0) {
      this.selectedNotes.splice(this.selectedNotes.indexOf(data.selectableValue), 1);
    }
  }
  
  getNotes(){
    this._noteService.getAll().subscribe(
      notes => this.notes = notes,
      error => this.errorMessage = <any>error
    )
  }
  
  delete(){
    let toDelete = this.selectedNotes.map(id => {
      return this.notes.find(note => {
        return note.id == id;
      })
    })
    this._noteService.deleteAll(toDelete).subscribe(
      response => {
        this.getNotes();
      },
      error => this.errorMessage = <any>error
    )
  }
  
  edit(){
    this._router.navigate(['EditNote', {id: this.selectedNotes[0]}]);
  }
  
  view(){
    this._router.navigate(['NoteDetail', {id: this.selectedNotes[0]}]);
  }
}