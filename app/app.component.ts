import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { NotesComponent } from './notes.component';
import { NoteDetailComponent} from './note.detail.component';
import { NoteService } from './note.service';
import { DashboardComponent } from './dashboard.component';


@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, NoteService],
  template : `
  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Notes']">Notes</a>
  </nav>
  <router-outlet></router-outlet>
  `,
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
  }
])
export class AppComponent {
  title: string = "LitePad";
}