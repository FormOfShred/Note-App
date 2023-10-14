export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;

    // constructor
    constructor(user: {id: number, username: string, password: string}) {
        this.id = user.id; 
        this.username = user.username; 
        this.password = user.password; 
    }

    // create
    static create({id, username, password}): User {
        return new User({id, username, password});
    }
}