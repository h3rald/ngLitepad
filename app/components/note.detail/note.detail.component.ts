import { Component, OnInit, ElementRef } from 'angular2/core';
import { Note } from '../../models/note'
import { RouteParams, Router, RouterLink } from 'angular2/router';
import { NoteService } from '../../services/note.service';
import { 
  MATERIAL_DIRECTIVES,
  MdDialog,
  MdDialogConfig,
  MdDialogBasic,
  MdDialogRef  
} from 'ng2-material/all';
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
    private _dialog: MdDialog,
    private _element: ElementRef,
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
  
  confirmDelete(ev) {
    let config = new MdDialogConfig()
      .textContent('Do you want to permanently delete this note?')
      .clickOutsideToClose(true)
      .title('Delete Note')
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
    this._noteService.delete(this.note).subscribe(
      note => this._router.navigate(['Notes']),
      error => this.errorMessage = error
    );
  }
}