import {FilterValuesType, TodolistType} from "../App";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId: string
        title: string
    }
}
export type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todolistId: string,
        filter: FilterValuesType
    },
}

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilter


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const {todolistId} = action.payload
            return todolists.filter(tl => tl.id !== todolistId)
        }
        case 'ADD-TODOLIST': {
            const {todolistId, title} = action.payload
            const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'}
            return [...todolists, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {todolistId, title} = action.payload
            return todolists.map(t => t.id == todolistId ? {...t, title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const {todolistId, filter} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        }
        default:
            return todolists
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST', payload: {todolistId}
})
export const addTodolistAC = (todolistId: string, title: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST', payload: {todolistId, title}
})
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistActionType => ({
    type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}
})
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilter => ({
    type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}
})










