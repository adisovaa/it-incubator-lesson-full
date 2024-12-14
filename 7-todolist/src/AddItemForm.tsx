import {ButtonComp} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, Input, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <TextField
                value={title}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                variant="outlined"
                error={!!error}
                helperText={error}
                size='small'
            />
            <IconButton aria-label="delete" onClick={addItemHandler}>
                <AddBoxIcon/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}


