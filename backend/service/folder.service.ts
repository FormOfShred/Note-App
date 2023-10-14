import { Folder } from '../domain/model/folder';
import folderDB from '../domain/data-access/folder.db';
import userService from './user.service';
import { FolderInput } from '../types/types';

const getAllFolders = async ({userId} : {userId: number}): Promise<Folder[]> => {
    return await folderDB.getAllFolders({userId}); 
}

const getFolderById = async ({id}: {id: number}): Promise<Folder> => {
    if (!id || Number.isNaN(Number(id))) {
        throw new Error('Folder ID is an invalid number'); 
    }
    return await folderDB.getFolderById({id: id}); 
}

// story 1: As a user, i want to be able to create a folder
const createFolder = async ({name, color, userId}: FolderInput): Promise<Folder> => {
    if (name.toLowerCase() === 'all') {
        throw new Error(`Folder with name ${name} cannot be created.`); 
    }
    if (!name || name === '') {
        throw new Error('name must be filled in');
    }
    if (!color || color === '') {
        throw new Error('color must be filled in');
    }
    const user = await userService.getUserById({id: userId}); 
    if (!user) {
        throw new Error(`User with ${userId} does not exist`);
    }
    return await folderDB.createFolder({
        name: name, 
        color: color, 
        userId: userId, 
    }); 
}

// story 2: As a user, i want to be able to delete a folder
const deleteFolder = async ({id}: {id: number}): Promise<Folder> => {
    const folder = await (await folderDB.getFolderById({id}));
    if (folder.name.toLowerCase() === "all") {
        throw new Error('This folder cannot be deleted.'); 
    }
    return await folderDB.deleteFolder({id}); 
}

// story 3: As a user, i want to be able to add a note to a folder 
const addNoteToFolder = async ({
    folderId, 
    noteId, 
}: {
    folderId: number; 
    noteId: number; 
}): Promise<Folder> => {
    return await folderDB.addNoteToFolder({folderId, noteId}); 
}

// story 4: As a user, i want to be able to remove a note from its folder 
// const removeNoteFromFolder = async ({noteId}: {noteId: number}): Promise<Folder> => {
//     return await folderDB.removeNoteFromFolder({noteId}); 
// }


export default { getAllFolders, getFolderById, createFolder, deleteFolder, addNoteToFolder };

