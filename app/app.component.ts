import { Component, provide } from 'angular2/core';
import { 
  RouteConfig, 
  ROUTER_DIRECTIVES, 
  ROUTER_PROVIDERS,
  Location,
  LocationStrategy,
  HashLocationStrategy } from 'angular2/router';
import { NotesComponent } from './components/notes/notes.component';
import { NoteDetailComponent} from './components/note.detail/note.detail.component';
import { NoteService } from './services/note.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewNoteComponent } from './components/note.new/note.new.component';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS, 
    NoteService, 
    provide(LocationStrategy, {useClass: HashLocationStrategy})],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/notes',
    name: 'Notes',
    component: NotesComponent
  },
  {
    path: '/detail/:id',
    name: 'NoteDetail',
    component: NoteDetailComponent
  },
  {
    path: '/new',
    name: 'NewNote',
    component: NewNoteComponent
  }
])
export class AppComponent {
  title: string = "LitePad";
}