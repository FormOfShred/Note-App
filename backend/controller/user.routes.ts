/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http 
 *      scheme: bearer 
 *      bearerFormat: JWT
 *    schemas:
 *     User:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: int64
 *        username:
 *          type: string
 *          description: username of the user.
 *        password:
 *          type: string
 *          description: password of the user.
 *     UserInput: 
 *      type: object
 *      properties: 
 *        username: 
 *          type: string 
 *          description: username of the user. 
 *        password: 
 *          type: string 
 *          description: password of the user. 
 */
import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - users
 *    summary: Get a list of users.
 *    responses:
 *      200:
 *        description: A list of users.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - users
 *    summary: Get the user by id.
 *    responses:
 *      200:
 *        description: The user by id.
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 * 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 * 
 */

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById({id: parseInt(req.params.id)});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger 
 * /users/register: 
 *   post: 
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - users
 *    summary: Register. 
 *    requestBody: 
 *      required: true 
 *      content: 
 *        application/json: 
 *          schema: 
 *           $ref: '#/components/schemas/UserInput'
 *    responses: 
 *     200: 
 *       description: User is registered.  
 *       content: 
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/User'
 */

userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const userInput = <UserInput>req.body; 

        if (!userInput.username || !userInput.password) {
            throw new Error('Please provide a username and password.'); 
        }
    
        const user = await userService.createUser(userInput); 
        res.status(200).json({ message: 'Registration successful. You will be redirected to the login page.'});
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
});

/**
 * @swagger 
 * /users/login: 
 *   post: 
 *    security: 
 *     - bearerAuth: []
 *    tags:
 *     - users
 *    summary: Log in. 
 *    requestBody: 
 *      required: true 
 *      content: 
 *        application/json: 
 *          schema: 
 *           $ref: '#/components/schemas/UserInput'
 *    responses: 
 *     200: 
 *       description: User is authenticated.  
 *       content: 
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/User'
 */

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const userInput = <UserInput>req.body;
        const {token, userId} = await userService.authenticate(userInput); 
        res.status(200).json({ message: 'Authentication succesful', token, userId})
    } catch (err) {
        res.status(401).json({status: 'unauthorized', message: err.message});
    }
});

export { userRouter };