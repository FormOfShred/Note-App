const loginUser = ({username, password}: {username: string, password: string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', 
    {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({username, password})
    })
}

const registerUser = ({username, password}: {username: string, password: string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/register', 
    {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({username, password})
    })
}

const UserService = {
    loginUser, 
    registerUser
}

export default UserService;