import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { AppDispatch } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask } from "../api/tasksApi.types"
import { TaskStatus } from "common/enums"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    case "ADD-TASK": {
      const newTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "CHANGE_TASK_STATUS": {
      const { id, todoListId, status } = action.payload.task

      return {
        ...state,
        [todoListId]: state[todoListId].map((t) =>
          t.id === id
            ? {
                ...t,
                status: status,
              }
            : t,
        ),
      }
    }

    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.title,
              }
            : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }

    default:
      return state
  }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET_TASKS", payload } as const
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}
export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload,
  } as const
}
export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
  return {
    type: "CHANGE_TASK_TITLE",
    payload,
  } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const deleteTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.deleteTask(arg).then((res) => {
    dispatch(removeTaskAC(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const updateTaskStatusTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  // const model: any = {
  //   title: task.title,
  //   description: task.description,
  //   status,
  //   priority: task.priority,
  //   startDate: task.startDate,
  //   deadline: task.deadline,
  // }

  tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model: task }).then((res) => {
    dispatch(changeTaskStatusAC({ task }))
  })
}

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
  | SetTasksActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
