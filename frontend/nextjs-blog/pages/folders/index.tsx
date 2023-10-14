import { Folder } from '../../types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FolderService from '../../services/FolderService';
import FoldersOverviewList from '../../components/folders/FoldersOverviewList';
import Head from 'next/head';
import Header from '../../components/Header';
import { Note } from '../../types';
import NotesOverviewList from '../../components/notes/NotesOverviewList';
import NoteService from '../../services/NoteService';
import NoteView from '../../components/notes/NoteView';

const Folders: React.FC = () => {
    const [folders, setFolders] = useState<Array<Folder>>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [notes , setNotes] = useState<Array<Note>>();
    const [note, setNote] = useState<Note>();
    const [noteId, setNoteId] = useState<number>(null);
    const [error, setError] = useState<string>(""); 

    const handleApiResponse = async (response: Response) => {
        setError("");
        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    "Access denied, you don't have permission to access this page. Please log in first."
                ); 
            } else {
                setError(response.statusText);
            }
        } else {
            return await response.json();
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const getFolders = async () => {
        const response = await FolderService.getAllFolders(); 
        const folders = await handleApiResponse(response);
        if (folders) {
            setFolders(folders);
        }
    }

    const handleChosenFolder = async (id: number) => {
        const response = await FolderService.getFolderById(id);
        const data = await handleApiResponse(response);
        if (data) {
            setNotes(data.notes);
            setNoteId(null);
        }
    }

    const onNoteClick = async (id: number) => {
        const response = await NoteService.getNoteById(id);
        const data = await handleApiResponse(response);
        if (data) {
            setNote(data);
            setNoteId(id);
            setNotes(null);
        }
    }

    useEffect(() => {
        getFolders();
    }, []);

    return (
        <div>
            <Head>
                <title>Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header></Header>

            <main className="container-fluid"> 
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!error && 
            <>
            <div className="dropdown m-1 px-3">
                    <Link className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Folders
                    </Link>

                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="/notes">Notes</Link></li>
                        <li><Link className="dropdown-item" href="/folders">Folders</Link></li>
                    </ul>

                    <Link href="#" className="btn bg-dark rounded-pill btn-outline-secondary m-1" onClick={toggleForm}>+</Link>
                </div>

                <div className="row">
                    <div className="col">
                        <FoldersOverviewList folders={folders} showForm={showForm} handleChosenFolder={handleChosenFolder}></FoldersOverviewList>
                    </div>
                    <div className="col-8">
                        <NotesOverviewList notes={notes} onNoteClick={onNoteClick}></NotesOverviewList>
                        {noteId && <NoteView note={note} />}
                    </div>
                </div>
            </>}
            </main>
        </div>
    );

}

export default Folders;