import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: TodolistType[] = []

	const action = addTodolistAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action) // {id: []}
	const endTodolistsState = todolistsReducer(startTodolistsState, action) // {id, title, filter}

	const keys = Object.keys(endTasksState) //['id']
	const idFromTasks = keys[0] // 'id'
	const idFromTodolists = endTodolistsState[0].id //'id'

	expect(idFromTasks).toBe(action.payload.id)
	expect(idFromTodolists).toBe(action.payload.id)
})


