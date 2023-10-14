export interface UserInput {
    username: string; 
    password: string; 
}

export interface FolderInput { 
    name: string;
    color: string; 
    userId: number; 
}

export interface LabelInput {
    name: string;
    color: string;
}

export interface NoteInput {
    id: number; 
    title: string;
    text: string;
    date: Date;
    userId: number;
    folderId: number;
}