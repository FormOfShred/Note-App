import { Note } from "./note";

export class Folder {
    readonly id?: number;
    readonly name: string;
    readonly color: string;
    notes?: Note[];

    // constructor
    constructor(folder: {id: number, name: string, color: string, notes?: Note[]}){
        this.id = folder.id; 
        this.name = folder.name;
        this.color = folder.color; 
        this.notes = folder.notes; 
    }

    // create
    static create({id, name, color}): Folder {
        return new Folder({id, name, color});
    }
}