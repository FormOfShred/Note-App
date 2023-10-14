import { Folder as FolderPrisma, Note as NotePrisma } from '@prisma/client'; 
import { Folder } from '../model/folder';
import { mapToNotes } from './note.mapper';

const mapToFolder = ({
    id, 
    name, 
    color, 
    notes, 
}: FolderPrisma & { notes?: NotePrisma[]}): Folder => 
    new Folder({id, name, color, notes: notes ? mapToNotes(notes) : []}); 

const mapToFolders = (foldersPrisma: (FolderPrisma & { notes?: NotePrisma[]})[]): Folder[] => 
    foldersPrisma.map(mapToFolder); 

export { mapToFolder, mapToFolders }