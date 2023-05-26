import {nanoid} from "nanoid";
import { ReactNode, createContext, useContext, useState,useEffect } from "react";
import { UpdateTodo } from "../components/UpdateTodo";

export type Todo = {
    id : string,
    value : string
}
type TodoContextProviderProps = {
    children : ReactNode
}
interface TodoContext {
    todoCount : number,
    allTodos : Array<Todo>,
    addTodo: (value : string)=>void,
    deleteTodo: (id : string)=>void,
    updateTodo: (id : string, newValue : string) => void,
    setToUpdateTodo: (updateTodo : Todo) => void,
    setToggleUpdate : (prev : boolean) =>void,
    toggleUpdate : boolean,
    todoError : boolean,
}

const TodoContext = createContext<TodoContext>({} as TodoContext);

export function useTodoContext(){ 
    return useContext<TodoContext>(TodoContext);
}

export function TodoContextProvider({children} : TodoContextProviderProps){
    const [allTodos,setAllTodos] = useState<Array<Todo>>([]);
    const [todoError,setTodoError] = useState<boolean>(false);
    const [todosChange,setTodoChange] = useState<boolean>(false);

    const [toggleUpdate,setToggleUpdate] = useState<boolean>(false);
    const [toUpdateTodo,setToUpdateTodo] = useState<Todo>({} as Todo);
    const todoCount = allTodos.length;

    useEffect(()=>{
        setAllTodos(extractFromLocalStorage("allTodos"));
    },[])

    useEffect(()=>{
        if(todosChange)
            saveToLocalStorage<Array<Todo>>("allTodos",allTodos);
    },[allTodos,todosChange])

    function saveToLocalStorage<T>(name : string, element : T){
        localStorage.setItem(name,JSON.stringify(element));
    }

    function extractFromLocalStorage(name : string){
        const item = localStorage.getItem(name);

        if(!item){
            return [];
        }

        return JSON.parse(item);
    }

    function initializeTodo(value : string) : Todo | null{
        if(value.trim()!=="")
            return {id: nanoid(),value:value};
        setTodoError(true);

        setTimeout(()=>{
            setTodoError(false);
        },2000);
        return null;

    }
    function addTodo(value : string){
        const newTodo = initializeTodo(value);

        if(newTodo){
            setAllTodos(prevTodos=>{
                return [...prevTodos,newTodo];
            });
            setTodoChange(true);
        }
            
    }

    function deleteTodo(id : string){
        setAllTodos(prevTodos=>{
            return prevTodos.filter(todo=>todo.id!==id) || [];
        })
        setTodoChange(true);
    }

    function updateTodo(id : string,newValue : string){
        const targetTodo = allTodos.find(todo=>todo.id===id) || null;

        if(targetTodo){
            targetTodo.value=newValue;
            setAllTodos(prevTodos=>{
                return prevTodos.map(todo=>{
                    if(todo.id===id){
                        return targetTodo
                    }else return todo;
                })
            })
            setToUpdateTodo(targetTodo);
            setTodoChange(true);
        }else{
            throw new Error(`Cannot find any todo with the id of ${id}`);
        }
    }


    return <TodoContext.Provider value={{allTodos,todoCount,addTodo,deleteTodo,updateTodo,setToUpdateTodo,toggleUpdate,setToggleUpdate,todoError}}>
            <div className="flex flex-col xs:flex-row xs:gap-1">
            <div className="min-w-[280px]">
                {children}
            </div>
            <UpdateTodo toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} toUpdateTodo={toUpdateTodo} updateTodo={updateTodo} />
            </div>
        </TodoContext.Provider>
}