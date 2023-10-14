import React from "react";
import { Note } from "../../types";
import 'bootstrap/dist/css/bootstrap.css';
import Link from "next/link";
import NoteService from "../../services/NoteService";

type Props = {
    notes: Array<Note>;
    onNoteClick: (id: number) => void;
}

const NotesOverviewList: React.FC<Props> = ({ notes, onNoteClick } : Props) => {

    const handleDeleteLabel = async (noteId: number, labelId: number) => {
        await NoteService.deleteLabelFromNote({noteId, labelId});
    }
    return (
            <ul className="list-group list-group-flush">
                {notes?.map((note) => (
                    <Link href="#" className="list-group-item list-group-item-action" key={note.id} onClick={() => onNoteClick(note.id)}>{note.title} 
                        <span className="badge bg-secondary m-1">{new Date(note.date).toLocaleDateString()}</span>
                        {note.labels?.map((label) => (
                            <span className="badge m-1" style={{backgroundColor: label?.color}} key={label.id} onDoubleClick={() => handleDeleteLabel(note.id, label.id)}>{label.name}</span>
                        ))}
                        
                        <span className="badge m-1" style={{ backgroundColor: note.folder?.color }}>{note.folder?.name}</span>

                        <div className="ms-2 me-auto">
                            {note.text.substring(0, 50)}
                        </div>
                    </Link>
                ))}
            </ul>
    );
}

export default NotesOverviewList;
