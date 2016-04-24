import { provide, Component, Input, OnDestroy, ApplicationRef  } from 'angular2/core';
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
import { NoteDetailComponent} from './components/note.detail/note.detail.component';
import { NoteService } from './services/note.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewNoteComponent } from './components/note.new/note.new.component';
import { EditNoteComponent } from './components/note.edit/note.edit.component';
import {Media, MATERIAL_DIRECTIVES, SidenavService} from 'ng2-material/all';

@Component({
  selector: 'app',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS, 
    NoteService, 
    provide(LocationStrategy, {useClass: HashLocationStrategy})],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  host: {
    '[class.push-menu]': 'fullPage'
  }
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '/notes',
    name: 'Notes',
    component: NotesComponent,
    useAsDefault: true
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