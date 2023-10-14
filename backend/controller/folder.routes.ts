/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http 
 *      scheme: bearer 
 *      bearerFormat: JWT
 *    schemas:
 *     Folder:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: int64
 *        name:
 *          type: string
 *          description: name of the folder.
 *        color:
 *          type: string
 *          description: color of the folder.
 *     FolderInput: 
 *       type: object 
 *       properties: 
 *         name: 
 *           type: string
 *           description: name of the folder. 
 *         color: 
 *           type: string 
 *           description: color of the folder. 
 *         userId: 
 *            type: number
 *            description: The ID of the user that owns the folder. 
 *  
 */
import express, { Request, Response } from 'express';
import folderService from '../service/folder.service';
import { FolderInput } from '../types/types';

const folderRouter = express.Router();

/**
 * @swagger
 * /folders:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - folders
 *    summary: Get a list of folders.
 *    responses:
 *      200:
 *        description: A list of folders.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Folder'
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: User ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 */

folderRouter.get('/', async (req: Request, res: Response) => {
    try {
        const folders = await folderService.getAllFolders({userId: parseInt(req.query.userId as string)});
        res.status(200).json(folders);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /folders/{id}:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - folders
 *    summary: Get the folder by id.
 *    responses:
 *      200:
 *        description: The folder by id.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Folder'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: folder ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 */

folderRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const folder = await folderService.getFolderById({id: parseInt(req.params.id)});
        res.status(200).json(folder);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});   

/**
 * @swagger 
 * /folders: 
 *   post:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - folders
 *    summary: Add a new folder. 
 *    requestBody: 
 *      required: true 
 *      content: 
 *        application/json: 
 *          schema: 
 *            $ref: '#/components/schemas/FolderInput'
 *    responses:
 *     200:
 *      description: A new folder is added. 
 *      content: 
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Folder'
 */

folderRouter.post('/', async (req: Request, res:Response) => {
    const folderInput = <FolderInput>req.body; 
    try {
        const folder = await folderService.createFolder(folderInput); 
        res.status(200).json(folder);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
})

/**
 * @swagger
 * /folders/{id}:
 *   delete:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - folders
 *    summary: Delete a folder.
 *    responses:
 *      200:
 *        description: Folder is deleted.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Folder'
 * 
 *   parameters:
 *      - name: id
 *        in: path
 *        description: Folder ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 */

folderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const folder = await folderService.deleteFolder({id: parseInt(req.params.id)});
        res.status(200).json(folder);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message})
    }
})

/**
 * @swagger 
 * /folders/{folderId}/{noteId}: 
 *  post:
 *   security: 
 *    - bearerAuth: []
 *   tags:
 *    - folders
 *   summary: Add a note to a folder. 
 *   responses:
 *    200:
 *     description: Add note to a folder. 
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Folder'
 * 
 *   parameters:
 *      - name: folderId
 *        in: path
 *        description: Folder ID
 *        required: true
 *        schema: 
 *          type: integer
 *          format: int64
 *      - name: noteId
 *        in: path
 *        description: Note ID
 *        required: true
 *        schema: 
 *          type: integer
 *          format: int64
 */

folderRouter.post('/:folderId/:noteId', async (req: Request, res: Response) => {
    try {
        const folder = await folderService.addNoteToFolder({folderId: parseInt(req.params.folderId),noteId: parseInt(req.params.noteId)})
        res.status(200).json(folder)
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err.message})
    }
})

// /**
//  * @swagger
//  * /folders/{noteId}:
//  *   delete:
//  *    summary: Delete a note from its folder.
//  *    responses:
//  *      200:
//  *        description: Note is deleted from its folder.
//  *        content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Folder'
//  * 
//  *   parameters:
//  *      - name: noteId
//  *        in: path
//  *        description: Note ID
//  *        required: true
//  *        schema:
//  *          type: integer
//  *          format: int64
//  */

// folderRouter.delete('/:noteId', async (req: Request, res: Response) => {
//     try {
//         const folder = await folderService.removeNoteFromFolder({noteId: parseInt(req.params.noteId)});
//         res.status(200).json(folder);
//     } catch (err) {
//         res.status(500).json({status: 'error', message: err.message})
//     }
// })


export { folderRouter };
