import {v1} from 'uuid'
import {TodolistType} from '../App'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    // const action: RemoveTodolistActionType = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         todolistId: todolistId1,
    //     },
    // }
    // const action: RemoveTodolistActionType = removeTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action: AddTodolistActionType = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist',
    //         todolistId: todolistId1
    //     },
    // }

    const endState = todolistsReducer(startState, addTodolistAC(todolistId1, 'New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action: ChangeTodolistActionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         todolistId: todolistId2,
    //         title: 'New Todolist',
    //     },
    // }
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action: ChangeTodolistFilter = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         todolistId: todolistId2,
    //         filter: 'completed',
    //     },
    // }

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})










