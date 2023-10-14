const getAllNotes = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes?userId=' + sessionStorage.getItem("id"), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const getNoteById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes/' + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const deleteNoteById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes/' + id, {
        method: 'DELETE', 
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const addLabelToNote = (noteId: number, name: string, color: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes/label/' + noteId, 
    {
        method: 'PUT', 
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({name, color})
    })
}

const updateNoteById = (id: number, title: string, text: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({id, title, text})
    })
}

const createNote = ({title, text}: {title: string, text: string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes', 
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({title, text, userId: parseInt(sessionStorage.getItem("id"))})
    })
}

const deleteLabelFromNote = ({noteId, labelId} : {noteId: number, labelId: number}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/notes/' + noteId + '/' + labelId, 
    {
        method: 'PUT', 
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            'Content-type': 'application/json', 
        }, 
    })
}
        

const NoteService = {
    getAllNotes,
    getNoteById,
    deleteNoteById,
    updateNoteById,
    createNote, 
    addLabelToNote, 
    deleteLabelFromNote
}

export default NoteService;