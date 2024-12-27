import { Todolist } from "./todolistApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const todolistApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  removeTodolist: (id: string) => {
    return instance.delete<BaseResponse<{}>>(`todo-lists/${id}`)
  },
  updateTodolist: (arg: { title: string; id: string }) => {
    const { id, title } = arg
    return instance.put<BaseResponse<{}>>(`todo-lists/${id}`, { title })
  },
}
