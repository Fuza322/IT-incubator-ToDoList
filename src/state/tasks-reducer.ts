import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type FirstActionType = {
    type: ''
    id: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskId: string
    title: string
    todolistId: string
}

export type ActionsType = FirstActionType | RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export function tasksReducer(state: TasksStateType, action: ActionsType): TasksStateType {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]}
        }
        case 'CHANGE-STATUS-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS-TASK', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskId: taskId, title: title, todolistId: todolistId}
}