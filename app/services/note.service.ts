import {Injectable} from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Note} from '../models/note';

@Injectable()
export class NoteService {

  private url = "http://localhost:9500/docs/litepad/notes/";

  constructor(private http: Http) { };

  private processData(res: Response) {
    if (res.status < 200 || res.status > 300) {
      throw new Error('Bad Response - ' + res.status)
    }
    try {
      return res.json();
    } catch (e){
      console.warn("Response body is not in JSON format:", res)
      return {}
    }
  }

  private processNote(note: any) {
    return {
      id: note.id.replace('litepad/notes/', ''),
      title: note.data.title,
      contents: note.data.contents,
      created: new Date(Date.parse(note.created)),
      modified: note.modified ? new Date(Date.parse(note.modified)) : null,
      tags: note.tags
    }
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error);
  }
  
  private processMultipleResponses(resp: any) {
    console.log(resp); 
    return resp;
  }

  getAll(): Observable<Note[]> {
    return this.http.get(this.url + "?sort=-modified")
      .map(this.processData)
      .map((json: any) => { return json.results.map(this.processNote) })
      .catch(this.handleError)
  }

  get(id: string): Observable<Note> {
    return this.http.get(this.url + id + "?raw=true")
      .map(this.processData)
      .map(this.processNote)
      .catch(this.handleError)
  }

  create(note: Note) {
    let body = JSON.stringify({ title: note.title, contents: note.contents });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options)
      .map(this.processData)
      .map(this.processNote)
      .catch(this.handleError)
  }
  
  update(note: Note) {
    let body = JSON.stringify({ title: note.title, contents: note.contents });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + note.id, body, options)
      .map(this.processData)
      .map(this.processNote)
      .catch(this.handleError)
  }
  
  delete(note: Note) {
    return this.http.delete(this.url + note.id)
      .map(() => { return note })
      .catch(this.handleError)
  }
  
  deleteAll(notes: Array<Note>){
    let reqs = [];
    notes.forEach((note) => {
      reqs.push(this.delete(note));
    })
    return Observable.forkJoin(reqs)
      .map(this.processMultipleResponses)
      .catch(this.handleError);
  }
} 