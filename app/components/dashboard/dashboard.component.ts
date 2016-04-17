import { Component, OnInit } from 'angular2/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { Router } from 'angular2/router';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/components/dashboard/dashboard.component.html',
  styleUrls: ['app/components/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];
  errorMessage: string;

  constructor(
    private _noteService: NoteService,
    private _router: Router) {
  }

  ngOnInit() {
    this._noteService.getAll().subscribe(
      notes => this.notes = notes,
      error => this.errorMessage = <any>error
    )
  }

  goToDetail(note: Note) {
    let link = ['NoteDetail', { id: note.id }];
    this._router.navigate(link);
  }

}