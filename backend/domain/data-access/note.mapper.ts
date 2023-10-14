import { Note as NotePrisma } from '@prisma/client'
import { Note } from '../model/note'
import { User as UserPrisma } from '@prisma/client'
import { Folder as FolderPrisma } from '@prisma/client'
import { Label as LabelPrisma } from '@prisma/client'
import { mapToLabels } from './label.mapper'

const mapToNote = ({
    id,
    title,
    text,
    date,
    user,
    folder,
    labels,
}: NotePrisma & {
    user: UserPrisma,
    folder: FolderPrisma,
    labels ? : LabelPrisma[]
}): Note => new Note({ id, title, text, date, user, folder, labels: labels ?  mapToLabels(labels) : []});

const mapToNotes = (notes: (NotePrisma & { labels?: LabelPrisma[]})[]): Note[] => notes.map(mapToNote);

export { 
    mapToNote, 
    mapToNotes 
};