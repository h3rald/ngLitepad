import {NOTES} from './mock-notes';
import {Injectable} from 'angular2/core';
import {Note} from '../models/note';

@Injectable()
export class NoteService {
  getNotes() {
    return Promise.resolve(NOTES);
  } 
  getNotesSlowly() {
    return new Promise<Note[]>(resolve => setTimeout(() => resolve(NOTES), 300))
  }
  getNote(id: number){
    return Promise.resolve(NOTES)
      .then(notes => notes.filter(note => note.id === id)[0]);
  }
} 