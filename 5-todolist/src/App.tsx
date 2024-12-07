import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'what to learn', filter: 'all'},
        {id: todolistId_2, title: 'what to buy', filter: 'active'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Avocado', isDone: false},
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const removeTask = tasks[todolistId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todolistId]: removeTask})
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const addedTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: addedTasks})
    }
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const changedTasks = tasks[todolistId]
            .map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        setTasks({...tasks, [todolistId]: changedTasks})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
    }

    const todolistsComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}

                removeTask={removeTask}
                changeFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
        <div className="App">
            {todolistsComponents}
        </div>
    );
}

export default App;