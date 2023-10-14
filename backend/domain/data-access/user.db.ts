import { User } from '../model/user';
import { PrismaClient } from '@prisma/client'
import { mapToUser, mapToUsers } from './user.mapper';

const prisma = new PrismaClient()

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany(); 
        return mapToUsers(usersPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const getUserById = async ({id}: {id: number}): Promise<User> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: {id: id}
        }); 
        return mapToUser(userPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const createUser = async ({
    username,
    password,
}: {
    username: string; 
    password: string;
}): Promise<User> => {
    try {
        const userPrisma = await prisma.user.create({
            data: {
                username, 
                password,
                folders: {
                    create: {
                        name: "all", 
                        color: "#85BDA6"
                    }
                }
            },
        });
        return mapToUser(userPrisma); 
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByUsername = async ({username}: {username: string}): Promise<User> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: {username: username}
        }); 
        if (userPrisma) {
            return mapToUser(userPrisma); 
        }
        return null;
    } catch (error) {
        console.error(error); 
        throw new Error('Database error. See server log for details.');
    }
}

export default { getAllUsers, getUserById, createUser, getUserByUsername };