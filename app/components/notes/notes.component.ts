import {Component, ElementRef } from 'angular2/core';
import {Note} from '../../models/note';
import {NoteDetailComponent} from '../note.detail/note.detail.component';
import {NoteService} from '../../services/note.service';
import {OnInit} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { 
  MATERIAL_DIRECTIVES, 
  ITableSelectableRowSelectionChange,
  MdDialog,
  MdDialogConfig,
  MdDialogBasic,
  MdDialogRef
} from 'ng2-material/all';

@Component({
  selector: 'notes',
  templateUrl : 'app/components/notes/notes.component.html' ,
  styleUrls:['app/components/notes/notes.component.css'],
directives: [NoteDetailComponent, MATERIAL_DIRECTIVES, RouterLink],
})
export class NotesComponent implements OnInit {
  public selectedNotes: Array<string> = [];
  public notes: Array<Note>;
  public errorMessage;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _element: ElementRef,
    private _dialog: MdDialog 
    ){ };
  
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
  
  onSelectAll(data: ITableSelectableRowSelectionChange){
    if (data.isActive){
      this.selectedNotes = this.notes.map((note) => note.id);
    } else {
      this.selectedNotes = [];
    }
  }
  
  getNotes(){
    this._noteService.getAll().subscribe(
      notes => this.notes = notes,
      error => {
        this.errorMessage = <any>error
        this.notes = [];
      }
    )
  }
  
  confirmDelete(ev) {
    let config = new MdDialogConfig()
      .textContent('Do you want to permanently delete selected notes?')
      .clickOutsideToClose(true)
      .title('Delete Notes')
      .ok('Delete')
      .cancel('Cancel')
      .targetEvent(ev);
    this._dialog.open(MdDialogBasic, this._element, config)
      .then((ref: MdDialogRef) => {
        ref.whenClosed.then((result) => {
          if (result) {
            this.delete();
          }
        })
      });
  };
  
  delete(){
    let toDelete = this.selectedNotes.map(id => {
      return this.notes.find(note => {
        return note.id == id;
      })
    })
    this._noteService.deleteAll(toDelete).subscribe(
      response => {
        this.selectedNotes = [];
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