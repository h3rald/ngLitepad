export class NoteData {
  title: string;
  contents: string;
}

export class Note {
  id: string;
  title: string;
  contents: string;
  tags: Array<string>;
  created: Date;
  modified: Date;
  highlight: string;
}