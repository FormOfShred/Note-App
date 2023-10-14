import Head from "next/head";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Note } from "../../types";
import NoteService from "../../services/NoteService";
import NoteView from "../../components/notes/NoteView";
import NotesOverviewList from "../../components/notes/NotesOverviewList";
import Link from "next/link";
import useInterval from "use-interval";


const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Array<Note>>();
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

    const getNotes = async () => {
        const response = await NoteService.getAllNotes(); 
        const allNotes = await handleApiResponse(response);

        if (allNotes) {
            setNotes(allNotes);
        }
    }

    const getNote = async (id: number) => {
        const response = await NoteService.getNoteById(id);
        const data = await handleApiResponse(response);

        if (data) {
            setNote(data);
        }
    }

    const handleNoteClick = (id: number) => {
        setNoteId(id);
        getNote(id);
    }

    useEffect(() => {
        getNotes();
        if (noteId) {
            getNote(noteId); 
        }
    }, [noteId]);

    useInterval(getNotes, 1000);

    const handleNewNote = async () => {
        const response = await NoteService.createNote({title: "", text: ""});
        const data = await handleApiResponse(response);
        if (data) {
            setNoteId(data.id);
        }        
    }

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
                        Notes
                    </Link>

                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="/notes">Notes</Link></li>
                        <li><Link className="dropdown-item" href="/folders">Folders</Link></li>
                    </ul>

                    <Link onClick={handleNewNote} href="#" className="btn bg-dark rounded-pill btn-outline-secondary m-1">+</Link>
                </div>

                <div className="row">
                    <div className="col">
                        <NotesOverviewList notes={notes} onNoteClick={handleNoteClick}></NotesOverviewList>
                    </div>
                    <div className="col-8">
                        {noteId && <NoteView note={note} />}
                    </div>
                </div>
            </>}
            </main>
        </div>
    );

}

export default Notes;