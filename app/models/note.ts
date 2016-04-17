export class NoteData {
  title: string;
}

export class Note {
  id: string;
  title: string;
  tags: Array<string>;
  created: Date;
  modified: Date;
}