import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";
import {TaskStatus} from "../common/enums/TaskStatus";

const token = 'e72b6587-c09b-4e58-9dfa-d6b037fc8812'
const apiKey = '8926efb3-8058-4dbc-978d-7d64ae825356'

const configs = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, configs)
                    .then(res => {
                        setTasks(prev => ({...prev, [tl.id]: res.data.items}))
                    })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Response<{
            item: Todolist
        }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, configs)
            .then(res => {
                const newTodo = res.data.data.item
                setTodolists([newTodo, ...todolists])
            })
    }
    const removeTodolistHandler = (id: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists$/${id}`, configs)
            .then(() => setTodolists(todolists.filter(tl => tl.id !== id)))
    }
    const updateTodolistHandler = (id: string, title: string) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, configs)
            .then(res => {
                const newTodolist = todolists.map(tl => tl.id === id ? {...tl, title} : tl)
                setTodolists(newTodolist)
            })
    }
    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, configs)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            })
    }
    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
            .then(() => setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
        const model: BaseTask = {
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        }

        axios.put<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t => t.id === task.id ? newTask : t)})
            })
    }
    const changeTaskTitleHandler = (title: string, task: any) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/todo-lists/{todolistId}/tasks/${task.id}`, configs)
            .then(res => {
                setTasks({
                    ...tasks,
                    [task.todoListId]: tasks[task.todoListId].map(t => t.id === task.id ? {...t, title} : t)
                })
            })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists
                .filter(task => task)
                .map((tl: any) => {
                    return (
                        <div key={tl.id} style={todolist}>
                            <div>
                                <EditableSpan
                                    value={tl.title}
                                    onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                                />
                                <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                            </div>
                            <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                            {/* Tasks */}
                            {!!tasks[tl.id] &&
                                tasks[tl.id].map((task) => {
                                    return (
                                        <div key={task.id}>
                                            <Checkbox
                                                checked={task.status === TaskStatus.Completed}
                                                onChange={e => changeTaskStatusHandler(e, task)}
                                            />
                                            <EditableSpan
                                                value={task.title}
                                                onChange={title => changeTaskTitleHandler(title, task)}
                                            />
                                            <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                        </div>
                                    )
                                })}
                        </div>
                    )
                })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

type Todolist = {
    id: string
    addedDate: string
    order: number
    title: string
}

type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: T
}

type FieldError = {
    error: string
    field: string
}

type GetTaskResponse = {
    totalCount: number
    error: string | null
    items: Task[]
}

type Task = BaseTask & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type BaseTask = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
}









































