import {TodolistType} from "../../../../../../app/App";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../model/todolists-reducer";
import {useDispatch} from "react-redux";
import styles from './TodolistTitle.module.css'

type PropsType = {
    todolist: TodolistType
}
export const TodolistTitle = ({todolist}: PropsType) => {
    const {title, id} = todolist

    const dispatch = useDispatch()
    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }

    const updateTodolist = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistId: id, title}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan value={title} onChange={updateTodolist}/></h3>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}