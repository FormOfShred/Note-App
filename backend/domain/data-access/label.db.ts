import { Label } from '../model/label';
import { PrismaClient } from '@prisma/client'; 
import { mapToLabel, mapToLabels } from './label.mapper';

const prisma = new PrismaClient()

// returns all labels of a user
const getAllLabels = async ({userId} : {userId: number}): Promise<Label[]> => {
    try {
        const labelsPrisma = await prisma.label.findMany({
            where: {
                notes: {
                    some: {
                        user: {
                            id: userId, 
                        },
                    },
                },
            },
        }); 
        return mapToLabels(labelsPrisma);  
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const getLabelById = async ({id}: {id: number}): Promise<Label> => {
    try {
        const labelPrisma = await prisma.label.findUnique({
            where: {
                id: id, 
            }, 
        });
        return mapToLabel(labelPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 13: create label
const createLabel = async ({
    name, 
    color, 
}: {
    name: string; 
    color: string; 
}): Promise<Label> => {
    try {
        const labelPrisma = await prisma.label.create({
            data: {
                name, 
                color, 
            }, 
        }); 
        return mapToLabel(labelPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

// story 14: delete label
const deleteLabel = async ({id}: {id: number}): Promise<Label> => {
    try {
        const deleteLabel = await prisma.label.delete({
            where: {
                id: id, 
            }, 
        }); 
        return await mapToLabel(deleteLabel); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

export default { 
    getAllLabels, 
    getLabelById, 
    createLabel, 
    deleteLabel 
};