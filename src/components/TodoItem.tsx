import { useTodoContext } from "../context/TodoContext"
import { Todo } from "../context/TodoContext"

interface TodoItemProps {
    id : string,
    value : string,
    addTodo : (id : string)=>void,
    deleteTodo : (id: string)=>void,
    updateTodo : (id: string,newValue: string)=>void,
    setToggleUpdate : (prev : boolean)=>void,
    toggleUpdate : boolean,
    setToUpdateTodo : (updateTodo : Todo) =>void;
}

export function TodoItem({id,value,addTodo,deleteTodo,updateTodo,setToggleUpdate,toggleUpdate,setToUpdateTodo}:TodoItemProps){

    return (
        <div className="todoItemContainer">
            <div className="todo flex items-center justify-between">
                <p className="text-gray-300">{value}</p>
                <div className="flex items-center gap-2">
                    <button onClick={()=>{
                        setToggleUpdate(!toggleUpdate);
                        setToUpdateTodo({id,value})
                        }} className="bg-blue-900 p-1 text-[.9em] rounded-lg duration-75 active:scale-90 hover:bg-blue-950">
                        update
                    </button>
                    <button onClick={()=>deleteTodo(id)} className="bg-red-900 p-1 text-[.9em] rounded-lg duration-75 active:scale-90 hover:bg-red-950"> 
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}