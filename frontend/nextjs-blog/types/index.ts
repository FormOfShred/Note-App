export interface Note {
    id: number; 
    title: string;
    text: string;
    date: Date;
    userId: number;
    folderId: number;
    labels: Label[];
    folder: Folder;
}

export interface Folder {
    id: number;
    name: string;
    color: string;
    userId: number;
}

export interface Label {
    id: number; 
    name: string; 
    color: string;
    notes: Note[];
}

export interface StatusMessage {
    type: string; 
    message: string;
}