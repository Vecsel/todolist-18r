import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";
import AddItemForm from "./components/AddItemForm";


//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const id_1 = v1()
    const id_2 = v1()
    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [id_1]: [{id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},],
        [id_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Wheat", isDone: false},
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        /*const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const copy = [...tasksForUpdate]
        const updatedTsk = copy.filter(task => task.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTsk
        setTasks(copyTasks)*/
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        /*const tasksForUpdate: Array<TaskType> = tasks[todoListId]*/
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        /*const updatedTasks: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)*/
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        /*const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const updatedTasks: Array<TaskType> =tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)*/

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoList([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: title} : t)})
    }
    const changeTodoListTitle = (todoListId: string, title: string) => [
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    ]

    const getFilteredTasks =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "completed":
                    return tasks.filter(task => task.isDone)
                case "active":
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        }

    const todoListComponents = todoLists.map((tl) => {
        return (
            <TodoList
                todolistId={tl.id}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                title={tl.title}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;
