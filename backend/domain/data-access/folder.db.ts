import { Folder } from '../model/folder';
import { PrismaClient } from '@prisma/client'
import { mapToFolder, mapToFolders } from './folder.mapper';

const prisma = new PrismaClient()

const getAllFolders = async ({userId} : {userId: number}): Promise<Folder[]> => {
    try {
        const foldersPrisma = await prisma.folder.findMany({
            where: {
                userId: userId, 
            }, 
            include: { notes: { include: { labels: true}}}, 
        }); 
        return mapToFolders(foldersPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const getFolderById = async ({id}: {id: number}): Promise<Folder> => {
    try {
        const folderPrisma = await prisma.folder.findUnique({
            where: {id: id}, 
            include: { notes: { include: { labels: true}}}, 
        });  
        return mapToFolder(folderPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 1: As a user, i want to be able to create a folder
const createFolder = async ({
    name, 
    color, 
    userId,
}: {
    name: string; 
    color: string; 
    userId: number;
}): Promise<Folder> => {
    try {
        const folderPrisma = await prisma.folder.create({
            data: {
                name, 
                color, 
                user: { connect: { id: userId }}, 
            }, 
        })
        return mapToFolder(folderPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 2: As a user, i want to be able to delete a folder
const deleteFolder = async ({id}: {id: number}): Promise<Folder> => {
    try {
        const deleteAllNotesFromFolder = await prisma.note.deleteMany ({
            where: {
                folderId: id,
            }, 
        })
        const folderPrisma = await prisma.folder.delete({
            where: {
                id: id, 
            }, 
        });   
        return mapToFolder(folderPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 3: As a user, i want to be able to add a note to a folder 
const addNoteToFolder = async ({
    folderId, 
    noteId, 
}:{
    folderId: number; 
    noteId: number; 
}): Promise<Folder> => {
    try {
        const updateNote = await prisma.note.update({
            where: {
                id: noteId, 
            }, 
            data: {
                folderId: folderId, 
            }, 
        })
        const folderPrisma = await prisma.folder.findUnique({
            where: {id: folderId}, 
            include: { notes: { include: { labels: true}}}, 
        });  
        return mapToFolder(folderPrisma)
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// // story 4: As a user, i want to be able to remove a note from its folder 
// const removeNoteFromFolder = async ({ noteId }: {noteId: number}): Promise<Folder> => {
//     try {
//         const updateNote = await prisma.note.update({
//             where: {
//                 id: noteId, 
//             },
//             data: {
//                 folderId: (await getFolderByName({name: "all"})).id, // Note will be placed in the folder "all"
//             }, 
//         })
//         const folderPrisma = await prisma.folder.findUnique({
//             where: {
//                 id: (await getFolderByName({name: "all"})).id, 
//             }, 
//             include: { notes: { include: { labels: true}}}, 
//         });  
//         return mapToFolder(folderPrisma); 
//     } catch (error) {
//         console.error(error); 
//         throw new Error('Database error. See server log for details.');
//     }
// }

// const getFolderByName = async ({name}: {name: string}): Promise<Folder> => {
//     try {
//         const folderPrisma = await prisma.folder.findFirst({
//             where: {
//                 name: name,  
//             }, 
//         })
//         return mapToFolder(folderPrisma); 
//     } catch (error) {
//         console.error(error); 
//         throw new Error('Database error. See server log for details.');
//     }
// }

export default { getAllFolders, getFolderById, createFolder, deleteFolder, addNoteToFolder };
