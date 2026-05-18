import React, { useState, type FC } from "react"
import FolderIcon from "../../assets/folder.svg";
import OpenFolderIcon from "../../assets/folder_open.svg";
import { File } from "../File/File";
import "./style.css";

type FolderProps = {
    content: TreeChild;
    folderName: string;
    level?: number;
}

export const Folder: FC<FolderProps> = ({ content, folderName, level = 0 }) => {

    const [isCurrentFolderOpen, setIsFolderOpen] = useState(false);
    
    const handleFolderClick = () => {
        setIsFolderOpen((prevState) => !prevState);
    }

    const renderTree = (nodes: TreeChild) => {
        const currentLevelNodes = Object.entries(nodes);

        return currentLevelNodes.map(([name, node]) => {
            if (node.type === 'folder') {
                return (
                    <Folder 
                        key={name} 
                        level={level + 1} 
                        folderName={name} 
                        content={node.children}/>
                )}
            
            if (node.type === 'file') {
                return (
                    <File key={name} name={name} level={level + 1}/>
                )
            }
        })
        
    }

    return (
        <div>
            <div className='folder' style={{"--depth": level} as React.CSSProperties} onClick={handleFolderClick}>
                {isCurrentFolderOpen ? <OpenFolderIcon/> : <FolderIcon/>}
                {folderName}
            </div>
            {isCurrentFolderOpen ? renderTree(content) : null}
        </div>
    )
}
