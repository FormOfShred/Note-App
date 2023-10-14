import React from "react";
import { Folder, Note } from "../../types";
import 'bootstrap/dist/css/bootstrap.css'
import Link from "next/link";
import NoteService from "../../services/NoteService";
import FolderService from "../../services/FolderService";
import { useState, useEffect } from "react";
import LabelsOverview from "../labels/LabelsOverview";

type Props = {
    note: Note;
}

const NoteView: React.FC<Props> = ({ note } : Props) => {
    const [title, setTitle] = useState(note?.title);
    const [text, setText] = useState(note?.text);
    const [folders, setFolders] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);

    const handleDelete = (id: number) => {
        NoteService.deleteNoteById(id);
        window.location.reload();
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await NoteService.updateNoteById(note.id, title, text);
    }

    const getFolders = async () => {
        const response = await FolderService.getAllFolders();
        const data = await response.json();
        setFolders(data);
    }

    const handleChosenFolder = async (folderId) => {
        const response = await FolderService.addNoteToFolder({folderId: folderId, noteId: note.id});
        const data = await response.json();
        setCurrentFolder(data);
    }

    useEffect(() => {
        setTitle(note?.title);
        setText(note?.text);
        setCurrentFolder(note?.folder);
        getFolders();
    }, [note]);

    return (
        <div className="card">
            <div className="card-header text-end">
                <div className="dropdown">
                    <a className="btn dropdown-toggle m-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: currentFolder?.color}}>
                        {currentFolder?.name}
                    </a>

                    <ul className="dropdown-menu">
                        {folders?.map((folder) => (
                            <li className="dropdown-item" key={folder.id} onClick={() => handleChosenFolder(folder.id)}>{folder.name}</li>
                        ))}
                    </ul>
                    <LabelsOverview noteId = {note?.id}></LabelsOverview>
                </div>
            </div>
            <form className="card-body" onSubmit={handleSubmit}>
                <input type="text" className={"form-control m-1"} id="title" 
                    value={title} style={{border: "none"}} onChange={(event) => setTitle(event.target.value)} placeholder="Click to add a title"/>
                <input type="text" className={"form-control m-1"} id="text" 
                        value={text} style={{border: "none"}} onChange={(event) => setText(event.target.value)} placeholder="Click to add a text"/>

                <button type="submit" className="btn btn-success m-1">Save</button>
                <Link href="/notes" onClick={() => handleDelete(note.id)} className="btn btn-danger m-1">Delete</Link>
            </form>
        </div>
    )
}

export default NoteView;