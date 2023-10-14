import React, { useState } from "react"; 
import NoteService from "../../services/NoteService";

type Props = {
    noteId: number;
}

const AddLabelForm: React.FC<Props> = ({ noteId } : Props) => {
    const [labelName, setLabelName] = useState('');
    const [color, setColor] = useState('#ff726f');

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (!labelName.trim()) { 
            return;
        }

        await NoteService.addLabelToNote(noteId, labelName, color)

        setLabelName('');
        setColor('#ff726f');
    }

    return (
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <input
          type="text"
          className="form-control rounded-0"
          id="labelName"
          placeholder="label name"
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
        />
        <input
          type="color"
          className="form-control-color border-0 me-2"
          name="labelColor"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          +
        </button>
      </form>
   )
}

export default AddLabelForm;