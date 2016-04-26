import {Component, } from 'angular2/core';
import {Note} from '../../models/note';
import {NoteService} from '../../services/note.service';
import {OnInit} from 'angular2/core';
import { Router, RouterLink, RouteParams } from 'angular2/router';
import { 
  MATERIAL_DIRECTIVES
} from 'ng2-material/all';

@Component({
  selector: 'searchbar',
  templateUrl : 'app/components/searchbar/searchbar.component.html' ,
  styleUrls:['app/components/searchbar/searchbar.component.css'],
directives: [MATERIAL_DIRECTIVES, RouterLink],
})
export class SearchbarComponent {
  title: string = "LitePad";
  version: string = "1.0"
  searchEnabled = false;
  query: string;

  private _subscription = null;

  constructor(
              public router: Router) {
  }
  
  enableSearch(val: boolean){
    this.searchEnabled = val;
  }
  
  search(){
    this.searchEnabled = false;
    this.router.navigate(['Search', {query: this.query}]);
  }

}