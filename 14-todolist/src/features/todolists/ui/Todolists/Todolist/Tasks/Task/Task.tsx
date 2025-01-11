import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import {
  changeTaskTitleAC,
  changeTaskTitleTC,
  deleteTaskTC,
  updateTaskStatusTC,
} from "../../../../../model/tasks-reducer"
import { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const newTask = { ...task, status }

    dispatch(updateTaskStatusTC(newTask))
    // dispatch(updateTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id }))
  }

  const changeTaskTitleHandler = (title: string) => {
    const newTitle = { ...task, title }
    dispatch(changeTaskTitleTC(newTitle))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
