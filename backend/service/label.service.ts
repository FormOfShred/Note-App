import { Label } from '../domain/model/label';
import labelDB from '../domain/data-access/label.db';
import { LabelInput } from '../types/types'; 

const getAllLabels = async ({userId} : {userId: number}): Promise<Label[]> => {
    return await labelDB.getAllLabels({userId}); 
}

const getLabelById = async ({id}: {id: number}): Promise<Label> => {
    if (!id || Number.isNaN(Number(id))) {
        throw new Error('Label ID is an invalid number'); 
    }
    return await labelDB.getLabelById({id: id}); 
}

// story 13: create label
const createLabel = async ({
    name, 
    color
}: LabelInput): Promise<Label> => {
    if (!name) {
        throw new Error('name must be filled in'); 
    }
    if (!color) {
        throw new Error('color must be filled in');
    }
    return await labelDB.createLabel({
        name: name, 
        color: color, 
    });
}

// story 14: delete label
const deleteLabel = async ({id}: {id: number}): Promise<Label> => {
    return await labelDB.deleteLabel({id: id}); 
}

export default { getAllLabels, getLabelById, createLabel, deleteLabel };