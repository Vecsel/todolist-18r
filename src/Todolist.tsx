import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditTableSpan from "./components/EditTableSpan";
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksListItems = props.tasks.length
        ? <ul>{
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.todolistId)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todolistId)
                }
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <div style={{display: "inline-block"}} className={task.isDone ? "task-done" : ""}>
                            <EditTableSpan title={task.title} changeTitle={changeTaskTitle}/>
                        </div>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })}</ul>
        : <span>List is empty</span>

    const onClickHandlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter, props.todolistId)

    const removeTodoList = () => props.removeTodoList(props.todolistId)
    const AddNewTasks = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodoListTitle=(title:string)=> {
        props.changeTodoListTitle(props.todolistId, title)
    }

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={AddNewTasks}/>
            {/*<div>
                <input
                    value={title}
                    onKeyDown={onEnterAddTask}
                    onChange={setLocalTitle}
                    className={error ? "input-error" : ""}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>*/}
            {tasksListItems}
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;