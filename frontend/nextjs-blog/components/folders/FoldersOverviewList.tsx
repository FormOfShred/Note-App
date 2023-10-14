import React from "react";
import { Folder } from "../../types";
import 'bootstrap/dist/css/bootstrap.css';
import Link from "next/link";
import FolderService from "../../services/FolderService";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    folders: Array<Folder>;
    showForm: boolean;
    handleChosenFolder: (id: number) => void;
}

const FoldersOverviewList: React.FC<Props> = ({ folders, showForm, handleChosenFolder } : Props) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ff726f');
    const [ editMode, setEditMode ] = useState(false);
    const router = useRouter();

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const response = await FolderService.createNewFolder({name, color});
            const data = await response.json();
            if(response.status === 200) {
                setTimeout(() => {
                    router.push("/folders");
                })
            } else {
                console.log(data.message)
            }
        }
    }

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const deleteFolder = async (id: number) => {
        const response = await FolderService.deleteFolder(id);
        window.location.reload();
    }

    return (
        <div>
            <ul className="list-group">
                {folders?.map((folder) => (
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <Link href="" className="list-group-item list-group-item-action rounded" 
                                role="button" style={{ backgroundColor: folder.color, opacity: 1 }} key={folder.id}
                                    onClick={() => handleChosenFolder(folder.id)}>
                                        {folder.name}
                        </Link> 
                        {editMode && <button type="submit" className="btn btn-danger ms-3" onClick={() => deleteFolder(folder.id)}>-</button>}
                    </li>
                ))}
                
                {showForm && (
                <form className="list-group-item list-group-item-action">
                    <input type="text" name="folderName" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Folder name" style={{border: "none"}} onKeyDown={handleKeyDown} />
                    <input type="color" name="folderColor" value={color} onChange={(e) => setColor(e.target.value)}
                        style={{border: "none"}} />
                </form>
                )}
            </ul>

            <button type="submit" className="btn btn-primary mt-3" onClick={handleEditMode}>Edit</button>
        </div>
    );
}

export default FoldersOverviewList;