import { Note } from '../domain/model/note';
import noteDB from '../domain/data-access/note.db';
import { Label } from '../domain/model/label';

// story 1: as a user, I want to be able to create a note
const createNote = async ({title, text, userId}): Promise<Note> => {
    /*if(!title) {
        throw new Error("Title is required");
    }
    if(!text) {
        throw new Error("Text is required");
    }*/
    const note = await noteDB.createNote({title, text, userId});
    return note;
}

// story 2: as a user, I want to be able to view a note
const getNoteById = async ({id}: {id: number}): Promise<Note> => {
    if (!id || Number.isNaN(Number(id))) {
        throw new Error('Note ID is an invalid number'); 
    }
    return await noteDB.getNoteById({id: id}); 
}

// story 3: as a user, I want to be able to edit a note
const updateNote = async ({
    id, 
    title, 
    text, 
}: {
    id: number; 
    title: string; 
    text: string; 
}): Promise<Note> => {
    if (!id || Number.isNaN(Number(id))) {
        throw new Error('Note ID is an invalid number'); 
    }
    if (!title) {
        throw new Error('title must be filled in'); 
    }
    if (!text) {
        throw new Error('text must be filled in'); 
    }
    return await noteDB.updateNote({
        id: id, 
        title: title, 
        text: text, 
    }); 
}

// story 4: as a user, I want to be able to delete a note
const deleteNote = async ({id}: {id: number}): Promise<Note> => {
    return await noteDB.deleteNote({id: id}); 
}

// story 5: as a user, I want to be able to view all notes
const getAllNotes = async ({userId} : {userId: number}): Promise<Note[]> => {
    return noteDB.getAllNotes({userId}); 
}

const addLabelToNote = async ({
    noteId, 
    label, 
}: {
    noteId: number; 
    label: Label; 
}): Promise<Note> => {
    return await noteDB.addLabelToNote({noteId: noteId, label: label});
}

const deleteLabelFromNote = async ({
    noteId, 
    labelId, 
}: {
    noteId: number;
    labelId: number;
}): Promise<Note> => {
    return await noteDB.deleteLabelFromNote({noteId: noteId, labelId: labelId});
}

export default { getAllNotes, getNoteById, createNote, updateNote, deleteNote, addLabelToNote, deleteLabelFromNote };