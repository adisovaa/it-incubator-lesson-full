import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        id,
        title,
        filter,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodolist
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), id)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, id)
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
        <div>
            <h3>
                {title}
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, id)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
