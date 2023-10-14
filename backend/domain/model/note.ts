import { Label } from './label';
import { User } from './user';
import { Folder } from './folder';

export class Note {
    readonly id?: number;
    title: string;
    text: string;
    readonly date: Date;
    readonly user: User;
    readonly folder: Folder;
    readonly labels?: Label[];

    // constructor
    constructor(note: {id:number, title: string, text: string, date: Date, user: User, folder: Folder, labels?: Label[]}) {
        this.id = note.id;
        this.title = note.title;
        this.text = note.text;
        this.date = note.date;
        this.user = note.user;
        this.folder = note.folder;
        this.labels = note.labels;
    }

    // create
    static create({id, title, text, date, user, folder}): Note {
        return new Note({id, title, text, date, user, folder});
    }
}