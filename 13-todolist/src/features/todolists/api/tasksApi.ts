import { instance } from "common/instance/instance"
import { DomainTask, UpdateTaskModel } from "./tasksApi.types"
import { ChangeEvent } from "react"
import { BaseResponse } from "common/types"

export const tasksApi = {
  createTask: (arg: { title: string; todolistId: string }) => {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${arg.todolistId}/tasks`)
  },
  deleteTask: (arg: { taskId: string; todolistId: string }) => {
    return instance.delete<BaseResponse<{}>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  changeTaskStatus: (arg: { e: ChangeEvent<HTMLInputElement>; task: DomainTask; model: UpdateTaskModel }) => {
    return instance.put(`todo-lists/${arg.task.todoListId}/tasks/${arg.task.id}`, arg.model)
  },
  changeTaskTitle: (arg: { title: string; task: DomainTask; model: UpdateTaskModel }) => {
    return instance.put<
      BaseResponse<{
        item: DomainTask
      }>
    >(`todo-lists/${arg.task.todoListId}/tasks/${arg.task.id}`, arg.model)
  },
}
