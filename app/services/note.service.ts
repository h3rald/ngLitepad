import {NOTES} from './mock-notes';
import {Injectable} from 'angular2/core';
import {Note} from '../models/note';

@Injectable()
export class NoteService {

  private _guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  
  private _notes: Note[] = NOTES.map(note => {
    return {id: this._guid(), title: note.title}
  });
  
  getNotes() {
    return Promise.resolve(this._notes);  
  }
  getNote(id: string) {
    return this.getNotes()
      .then(notes => {
        return notes.filter(note => {
          return note.id === id
        })[0]
      });
  }
  create(note: Note) {
    let newNote: Note = { id: this._guid(), title: note.title };
    this._notes.push(newNote);
    return Promise.resolve(newNote);
  }
  delete(note: Note) {
    this._notes.splice(this._notes.findIndex(value => {
      return note.id === value.id
    }), 1);
    return Promise.resolve(note.id);
  }
} 