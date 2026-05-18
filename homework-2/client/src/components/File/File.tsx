import type { FC } from "react";
import FileIcon from "../../assets/file.svg"
import "./style.css";

type FileProps = {
    name: string;
    level?: number;
}

export const File: FC<FileProps> = ({name, level = 0}) => {
    return (
        <div className="file" style={{"--depth": level} as React.CSSProperties} onClick={() => console.log('im file')}>
            <FileIcon/>
            {name}
        </div>
    )
}
