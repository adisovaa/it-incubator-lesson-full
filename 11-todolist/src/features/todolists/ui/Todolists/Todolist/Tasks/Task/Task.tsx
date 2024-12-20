import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType, TodolistType} from "../../../../../../../app/App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../model/tasks-reducer";
import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {getListItemSx} from "./Task.styles";

type PropsType = {
    task: TaskType
    todolist: TodolistType
}

export const Task = ({task, todolist}: PropsType) => {
    const {id} = todolist

    const dispatch = useDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: task.id, todolistId: id, isDone}))
    }

    const updateTask = () => {
        dispatch(changeTaskTitleAC({taskId: task.id, title: task.title, todolistId: id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={updateTask}/>
            </div>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}

