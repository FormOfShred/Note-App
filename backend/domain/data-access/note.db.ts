import { Note } from '../model/note';
import { PrismaClient } from '@prisma/client';
import { mapToNote, mapToNotes } from './note.mapper';
import { Label } from '../model/label';

const prisma = new PrismaClient();

// story 1: as a user, I want to be able to create a note
const createNote = async ({
    title,
    text,
    userId, 
}: {
    title: string;
    text: string;
    userId: number;
}): Promise<Note> => {
    try {
        // folder with name "all" is a folder where all notes are stored by default 
        const defaultFolder = await prisma.folder.findUnique({
            where: {
                name_userId: {
                    name: "all", 
                    userId: userId,
                } , 
            }, 
        }); 

        const notePrisma = await prisma.note.create({
            data: {
                title,
                text,
                date: new Date(Date.now()),
                user: { connect: { id: userId } },
                folder: { connect: { id: defaultFolder.id } },
            },
            include: {
                user: true,
                folder: true,
            },
        });
        return mapToNote(notePrisma); // map to Note
    } catch (error) {
        console.error(error);
        throw new Error("Error creating note");
    }
};

// story 2: as a user, I want to be able to view a note
const getNoteById = async ({id}: {id: number}): Promise<Note> => {
    try {
        const notePrisma = await prisma.note.findUnique({
            where: {
                id: id, 
            }, 
            include: {
                user: true,
                folder: true,
                labels: true,
            }, 
        }); 
        return mapToNote(notePrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
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
    try {
        const notePrisma = await prisma.note.update({
            where: {
                id: id, 
            }, 
            data: {
                title: title, 
                text: text, 
            }, 
            include: {
                user: true,
                folder: true,
            },
        }); 
        return mapToNote(notePrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 4: as a user, I want to be able to delete a note
const deleteNote =async ({id}: {id: number}): Promise<Note> => {
    try {
        const notePrisma = await prisma.note.delete({
            where: {
                id: id, 
            }, 
            include: {
                user: true,
                folder: true,
            },
        }); 
        return mapToNote(notePrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 5: as a user, I want to be able to view all notes
const getAllNotes = async ({userId} : {userId: number}): Promise<Note[]> => {
    try {
        const notesPrisma = await prisma.note.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true,
                folder: true,
                labels: true, 
            }, 
            orderBy: {
                id: 'asc', 
            }, 
        }); 
        return mapToNotes(notesPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const addLabelToNote = async ({
    noteId, 
    label, 
}: {
    noteId: number; 
    label: Label; 
}): Promise<Note> => {
    try {
        const notePrisma = await prisma.note.update({
            where: {
                id: noteId, 
            }, 
            data: {
                labels: {
                    connectOrCreate: {
                        where: {
                            name: label.name, 
                        }, 
                        create: {
                            name: label.name,
                            color: label.color,
                        }, 
                    }, 
                }, 
            }, 
            include: {
                user: true,
                folder: true,
                labels: true,
            },
        })
        return mapToNote(notePrisma);
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const deleteLabelFromNote = async ({
    noteId, 
    labelId, 
}: {
    noteId: number; 
    labelId: number; 
}): Promise<Note> => {
    try {
        const notePrisma = await prisma.note.update({
            where: {
                id: noteId, 
            }, 
            data : {
                labels: {
                    disconnect: {
                        id: labelId,
                    },
                },
            }, 
            include: {
                user: true,
                folder: true,
                labels: true,
            },
        })
        return mapToNote(notePrisma);
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

export default { getAllNotes, getNoteById, createNote, updateNote, deleteNote, addLabelToNote, deleteLabelFromNote };