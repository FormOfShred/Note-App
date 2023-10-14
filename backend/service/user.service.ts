import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import { UserInput } from '../types/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET; 

const generateJwtToken = (username: string): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'notery' };

    try { 
        return jwt.sign({ username }, jwtSecret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.')
    }
}

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
}

const getUserById = async ({id}: {id:number}): Promise<User> => {
    if (!id || Number.isNaN(Number(id))) {
        throw new Error('User ID is an invalid number'); 
    }

    const user = await userDB.getUserById({id: id}); 
    if (!user) {
        throw new Error(`User with ${id} does not exist`);
    }
    return user; 
}

const createUser = async ({
    username,
    password, 
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });

    if(existingUser) {
        throw new Error(`Username ${username} is already taken.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return await userDB.createUser({username, password: hashedPassword});
}

const authenticate = async ({ username, password }: UserInput): Promise<{token:string, userId: number}> => {
    const user = await userDB.getUserByUsername({ username }); 

    if (!user) {
        throw new Error('Incorrect username and/or password.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password); 

    if (!isValidPassword ) {
        throw new Error('Incorrect username and/or password.');
    }

    const token = generateJwtToken(username); 
    const userId = user.id; 

    return {token, userId}; 
}

export default { getAllUsers, getUserById, createUser, authenticate };


