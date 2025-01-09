import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../../model/tasksSelectors"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task/Task"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchTasksThunk } from "../../../../model/tasks-reducer"
import { TaskStatus } from "common/enums"
import { DomainTask } from "../../../../api/tasksApi.types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Tasks = ({ todolist, task }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksThunk(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.InProgress)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
