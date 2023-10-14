const getAllFolders = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/folders?userId=' + sessionStorage.getItem("id"), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const getFolderById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/folders/' + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const createNewFolder = ({name, color}: {name: string, color: string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/folders',
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({name, color, userId: parseInt( sessionStorage.getItem("id"))})
    })
}

const addNoteToFolder = ({folderId, noteId}: {folderId: number, noteId: number}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/folders/' + folderId + '/' + noteId,
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({folderId, noteId})
    })
}

const deleteFolder = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/folders/' + id,
    {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({id})
    })
}

const FolderService = {
    getAllFolders,
    getFolderById,
    createNewFolder,
    addNoteToFolder,
    deleteFolder
}

export default FolderService;