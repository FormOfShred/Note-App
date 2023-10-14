import { Note } from './note';

export class Label {
    readonly id?: number;
    readonly name: string;
    readonly color: string;

    // constructor
    constructor(label: {id: number, name: string, color: string}) {
        this.id = label.id;
        this.name = label.name;
        this.color = label.color;
    }

    // create
    static create({id, name, color}): Label {
        return new Label({id, name, color});
    }
}