import { 
  provide, 
  Component, 
  Input, 
  OnDestroy, 
  ApplicationRef } from 'angular2/core';
import { 
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  RouteConfig,
  Router,
  Location,
  LocationStrategy,
  HashLocationStrategy } from 'angular2/router';
import {Http, Response} from "angular2/http";
import { NotesComponent } from './components/notes/notes.component';
import { SearchComponent } from './components/search/search.component';
import { NoteDetailComponent} from './components/note.detail/note.detail.component';
import { NoteService } from './services/note.service';
import { NewNoteComponent } from './components/note.new/note.new.component';
import { EditNoteComponent } from './components/note.edit/note.edit.component';
import { Focused } from './directives/focused/focused.directive';
import {Media, MATERIAL_DIRECTIVES, SidenavService} from 'ng2-material/all';
import { ShortcutService } from './services/shortcut.service';

@Component({
  selector: 'app',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, Focused],
  providers: [
    ROUTER_PROVIDERS, 
    NoteService, 
    ShortcutService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  host: {
    '(document:keyup)': 'keyup($event)',
    '(document:keydown)': 'keydown($event)',
    '[class.push-menu]': 'fullPage'
  }
})
@RouteConfig([
  {
    path: '/notes',
    name: 'Notes',
    component: NotesComponent,
    useAsDefault: true
  },
  {
    path: '/search/:query',
    name: 'Search',
    component: SearchComponent
  },
  {
    path: '/detail/:id',
    name: 'NoteDetail',
    component: NoteDetailComponent
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: EditNoteComponent
  },
  {
    path: '/new',
    name: 'NewNote',
    component: NewNoteComponent
  }
])
export class AppComponent implements OnDestroy {
  title: string = "LitePad";
  version: string = "1.0"
  static SIDE_MENU_BREAKPOINT: string = 'gt-md';
  searchEnabled = false;
  query: string;

  @Input()
  fullPage: boolean = this.media.hasMedia(AppComponent.SIDE_MENU_BREAKPOINT);


  //version: string;

  //components: IComponentMeta[] = [];

  private _subscription = null;

  constructor(http: Http,
              //public navigation: NavigationService,
              public media: Media,
              public router: Router,
              public appRef: ApplicationRef,
              //private _components: ComponentsService,
              private _shortcut: ShortcutService,
              private _sidenav: SidenavService) {
    
    let query = Media.getQuery(AppComponent.SIDE_MENU_BREAKPOINT);
    this._subscription = media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.fullPage = mql.matches;
      this.appRef.tick();
    });
   
    /*
    http.get('public/version.json')
      .subscribe((res: Response) => {
        this.version = res.json().version;
      });

    
      this._components.getComponents()
      .then((comps) => {
        this.components = comps;
      });
      */
      
      this._shortcut.register("ctrl.f", () => { 
        this.enableSearch(true); 
      });
      this._shortcut.register("esc", () => { 
        this.enableSearch(false);
        this.router.navigate(['/Notes']); 
      });
      this._shortcut.register("ctrl.n", () => { 
        this.enableSearch(false);
        this.router.navigate(['/NewNote']); 
      });
  }
  
  keydown($event) {
    this._shortcut.keydown($event);
  }
  
  keyup($event) {
    this._shortcut.keyup($event);
  } 

  enableSearch(val: boolean){
    this.searchEnabled = val;
  }
  
  search(){
    this.searchEnabled = false;
    let query = this.query;
    this.query = "";
    this.router.navigate(['/Search', {query: query}]);
  }
  
  shortcut($event){
    console.log($event);
  }

  ngOnDestroy(): any {
    this._subscription.unsubscribe();
  }

  showMenu(event?) {
    this._sidenav.show('menu');
  }

  navigate(to: any) {
    this.router.navigate(to);
  }

}