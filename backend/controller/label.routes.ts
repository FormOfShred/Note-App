/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http 
 *      scheme: bearer 
 *      bearerFormat: JWT
 *    schemas:
 *     Label:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: int64
 *        name:
 *          type: string
 *          description: name of the label.
 *        color:
 *          type: string
 *          description: color of the label.
 *     LabelInput: 
 *      type: object
 *      properties:
 *        name: 
 *          type: string 
 *          description: name of the label. 
 *        color: 
 *          type: string 
 *          description: color of the label. 
 */
import express, { Request, Response } from 'express';
import labelService from '../service/label.service';
import { LabelInput } from '../types/types';

const labelRouter = express.Router();

/**
 * @swagger
 * /labels:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - labels
 *    summary: Get a list of labels.
 *    responses:
 *      200:
 *        description: A list of labels.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Label'
 * 
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: User ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 */

labelRouter.get('/', async (req: Request, res: Response) => {
    try {
        const labels = await labelService.getAllLabels({userId: parseInt(req.query.userId as string)});
        res.status(200).json(labels);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /labels/{id}:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - labels
 *    summary: Get the label by id.
 *    responses:
 *      200:
 *        description: The label by id.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Label'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: label ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

labelRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const label = await labelService.getLabelById({id: parseInt(req.params.id)});
        res.status(200).json(label);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /labels:
 *   post:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - labels
 *    summary: Add new label.
 *    requestBody: 
 *      required: true 
 *      content: 
 *        application/json: 
 *          schema: 
 *            $ref: '#/components/schemas/LabelInput'
 *    responses:
 *      200:
 *        description: A new label is added.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Label'
 */

labelRouter.post('/', async (req: Request, res: Response) => {
    const labelInput = <LabelInput>req.body; 
    try {
        const label = await labelService.createLabel(labelInput);
        res.status(200).json(label);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /labels/{id}:
 *   delete:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - labels
 *    summary: Delete a label.
 *    responses:
 *      200:
 *        description: Label deleted.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Label'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Label ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

labelRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const label = await labelService.deleteLabel({id: parseInt(req.params.id)});
        res.status(200).json(label);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

export { labelRouter };