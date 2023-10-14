import {  useEffect, useState } from "react";
import { Label } from "../../types";
import LabelService from "../../services/LabelService";
import NoteService from "../../services/NoteService";
import AddLabelForm from "./AddLabelForm";
import useInterval from "use-interval";

type Props = {
    noteId: number;
}

const LabelsOverview: React.FC<Props> = ({ noteId }) => {
    const [labelsList, setLabelsList] = useState<Label[]>();

    const getLabels = async () => {
        const response = await LabelService.getAllLabels();
        const labels = await response.json();
        setLabelsList(labels); 
    }; 

    const handleLabelSelect = async (label: Label) => {
        const response = await NoteService.addLabelToNote(noteId, label.name, label.color); 
        const data = await response.json();
    }

    useEffect(() => {
        getLabels();
      }, []);

    useInterval(getLabels, 5000);
    
    return (
        <>
        <a className="btn btn-secondary dropdown-toggle m-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Select label
        </a>
        <ul className="dropdown-menu">
            {labelsList?.map((label) => (
                <li className="dropdown-item" onClick={() => handleLabelSelect(label)} key={label.id}>{label.name}</li>
            ))}
            <li className="dropdown-item">
                <AddLabelForm noteId = {noteId}></AddLabelForm>
            </li>
        </ul>
        </>
    )
}

export default LabelsOverview;