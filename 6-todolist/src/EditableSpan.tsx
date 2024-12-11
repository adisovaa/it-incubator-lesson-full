import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }


    return (
        editMode
            ? <input
                autoFocus
                onBlur={offEditMode}
                value={newTitle}
                onChange={changeItemTitleHandler}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}