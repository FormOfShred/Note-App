/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http 
 *      scheme: bearer 
 *      bearerFormat: JWT
 *    schemas:
 *     Note:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: int64
 *        title:
 *          type: string
 *          description: title of the note.
 *        text:
 *          type: string
 *          description: contents of the note.
 *        date:
 *          type: date
 *          description: date the note was created.
 *     NoteInput:
 *      type: object
 *      properties:
 *        id: 
 *         type: number
 *         format: int64 
 *         required: false
 *        title:
 *         type: string
 *         description: title of the note.
 *        text:
 *         type: string
 *         description: contents of the note.
 */
import express, { Request, Response } from 'express';
import noteService from '../service/note.service';
import { LabelInput, NoteInput } from '../types/types';

const noteRouter = express.Router();

/**
 * @swagger
 * /notes:
 *   post:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Add new note.
 *    responses:
 *      200:
 *        description: A new note is added.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 * 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NoteInput'
 * 
 */

noteRouter.post('/', async (req: Request, res: Response) => {
    try {
        const noteInput = <NoteInput>req.body;
        const note = await noteService.createNote(noteInput);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Get the note by id.
 *    responses:
 *      200:
 *        description: The note by id.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Note ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

noteRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const note = await noteService.getNoteById({id: parseInt(req.params.id)});
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Update a note.
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schemas/NoteInput'
 *    responses:
 *      200:
 *        description: note updated.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 */

noteRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const noteInput = <NoteInput>req.body; 
        const note = await noteService.updateNote(noteInput);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Delete a note.
 *    responses:
 *      200:
 *        description: Note deleted.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Note ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

noteRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const note = await noteService.deleteNote({id: parseInt(req.params.id)});
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Get all notes for a user.
 *    responses:
 *      200:
 *        description: List of notes for a user.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: User ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 */

noteRouter.get('/', async (req: Request, res: Response) => {
    try {
        const notes = await noteService.getAllNotes({userId: parseInt(req.query.userId as string)});
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes/label/{noteId}:
 *   put:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Add a label to a note.
 *    responses:
 *      200:
 *        description: The label is added to the note.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 * 
 *    parameters:
 *      - name: noteId
 *        in: path
 *        description: Note ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LabelInput'
 * 
 */

noteRouter.put('/label/:noteId', async (req: Request, res: Response) => {
    const labelInput = <LabelInput>req.body;
    try {
        const note = await noteService.addLabelToNote({noteId: parseInt(req.params.noteId), label: labelInput});
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /notes/{noteId}/{labelId}:
 *   put:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - notes
 *    summary: Delete a label from a note.
 *    responses:
 *      200:
 *        description: The label deleted from the note.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 * 
 *    parameters:
 *      - name: noteId
 *        in: path
 *        description: Note ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 *      - name: labelId
 *        in: path
 *        description: Label ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

noteRouter.put('/:noteId/:labelId', async (req: Request, res: Response) => {
    try {
        const note = await noteService.deleteLabelFromNote({noteId: parseInt(req.params.noteId), labelId: parseInt(req.params.labelId)});
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});
export { noteRouter };