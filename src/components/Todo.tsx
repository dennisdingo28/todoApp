import { TodoItem } from "./TodoItem";
import { KeyboardEvent, useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function Todo(){
    const [todoValue,setTodoValue] = useState<string>("");
    const {todoCount,allTodos,addTodo,deleteTodo,updateTodo,setToggleUpdate,toggleUpdate,setToUpdateTodo,todoError} = useTodoContext();
    
    function handleKeyboardEnter(e : KeyboardEvent<HTMLInputElement>){
      if(e.key==="Enter"){
        e.preventDefault()
        addTodo(todoValue);
        setTimeout(()=>{
          setTodoValue("");
        },500);
      }
    }
    return (
        <div className="todoApp w-[100%] max-w-[400px] mx-auto bg-darkGrayColor rounded-t-md text-lightColor">
          <div className="todoHeader bg-[#181717] p-2 rounded-t-md">
            <h1 className="font-medium text-[1.2em] text-center text-gray-300 mb-2">Manage Your Work</h1>
            <div className="flex items-center justify-center gap-1">
              <input onKeyDown={handleKeyboardEnter} onChange={(e)=>setTodoValue(e.target.value)} value={todoValue} type="text" className="bg-transparent border-b-[.1px] w-[100%] border-b-lightColor px-1 outline-none text-[.8em]" placeholder="what to do?"/>
              <button onClick={(e)=>{
                
                addTodo(todoValue)
                setTimeout(()=>{
                  setTodoValue("");
                },500);
                }} className="bg-violet-900 rounded-sm px-2 hover:bg-[rgb(90,46,120)] text-[.9em] duration-75 active:scale-95">add</button>
              {todoError && <i className="bi bi-exclamation-circle text-red-800"></i>}
            </div>
          </div>
          <div className="todoBody">
            <p className="text-center mb-2"><small >Todos Count : {todoCount}</small></p>
            <div className="todoList p-2 flex flex-col gap-4">
                {
                    allTodos.map((todo,index)=>(
                        <TodoItem key={index} id={todo.id} value={todo.value} addTodo={addTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} setToggleUpdate={setToggleUpdate} toggleUpdate={toggleUpdate} setToUpdateTodo={setToUpdateTodo}/>
                    ))
                }
            </div>
          </div>
        </div>
    )
}