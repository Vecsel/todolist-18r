import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {log} from "util";
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (valueTitle: string) => void

}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")

    const mappedTasks=props.tasks.map((t,index) => {
        const removeTaskHandler=()=>{
            props.removeTask(t.id)
        }
        return(
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                {/*<button onClick={removeTaskHandler}>x</button>*/}
                <Button buttonName={"x"} callBack={removeTaskHandler}/>
                {/*<button onClick={() => {props.removeTask(t.id)}}>x</button>*/}
            </li>
        )})

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }

    }

    const changeFilterHandlerAll=()=>{
        props.changeFilter("all")
    }
    const changeFilterHandlerActive=()=>{
        props.changeFilter("active")
    }
    const changeFilterHandlerCompleted=()=>{
        props.changeFilter("completed")
    }
    const changeFilterHandler=(filterValue:FilterValuesType)=>{
        props.changeFilter(filterValue)
    }
    /*const removeTaskHandler=(tID:string)=>{
        props.removeTask(tID)
    }*/

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button buttonName={"+"} callBack={addTaskHandler}/>
        </div>
        <ul>
                {mappedTasks}
        </ul>
        <div>
            <Button buttonName={"All"} callBack={()=>changeFilterHandler("all")}/>
            <Button buttonName={"Active"} callBack={()=>changeFilterHandler("active")}/>
            <Button buttonName={"Completed"} callBack={()=>changeFilterHandler("completed")}/>
            {/*<button onClick={()=>changeFilterHandler("all")}>All</button>*/}
            {/*<button onClick={() => {props.changeFilter("all")}}>All</button>*/}
            {/*<button onClick={()=>changeFilterHandler("active")}>Active</button>*/}
            {/*<button onClick={() => {props.changeFilter("active")}}>Active</button>*/}
            {/*<button onClick={()=>changeFilterHandler("completed")}>Completed</button>*/}
            {/*<button onClick={() => {props.changeFilter("completed")}}>Completed</button>*/}
        </div>
    </div>
}
