import { User as UserPrisma } from '@prisma/client'; 
import { User } from '../model/user';

const mapToUser = ({
    id,
    username, 
    password, 
}: UserPrisma): User => new User({id, username, password});  

const mapToUsers = (usersPrisma: UserPrisma[]): User[] => usersPrisma.map(mapToUser); 

export { mapToUser, mapToUsers }