import {Component, } from 'angular2/core';
import {Note} from '../../models/note';
import {NoteService} from '../../services/note.service';
import {OnInit} from 'angular2/core';
import { Router, RouterLink, RouteParams } from 'angular2/router';
import { 
  MATERIAL_DIRECTIVES
} from 'ng2-material/all';

@Component({
  selector: 'search',
  templateUrl : 'app/components/search/search.component.html' ,
  styleUrls:['app/components/search/search.component.css'],
directives: [MATERIAL_DIRECTIVES, RouterLink],
})
export class SearchComponent implements OnInit {
  public notes: Array<Note>;
  public errorMessage;
  public query: string;
  
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _routeParams: RouteParams
    ){ };
  
  ngOnInit() {
    this.query = this._routeParams.get('query');
    this.search();
  }
  
  search(){
    this._noteService.search(this.query).subscribe(
      notes => this.notes = notes,
      error => {
        this.errorMessage = <any>error
        this.notes = [];
      }
    )
  }
  
}