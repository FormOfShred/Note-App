
const getAllLabels = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/labels?userId=' + sessionStorage.getItem("id"), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
}

const createLabel = (name: string, color: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/labels', 
    {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }, 
        body: JSON.stringify({name, color})
    })
}

const LabelService = {
    getAllLabels, 
    createLabel
}

export default LabelService; 