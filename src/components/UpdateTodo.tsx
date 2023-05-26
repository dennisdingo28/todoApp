import { useState } from "react"
import { Todo } from "../context/TodoContext"
import { KeyboardEvent } from "react"

interface UpdateTodoProps {
    toggleUpdate : boolean,
    toUpdateTodo : Todo,
    updateTodo : (id : string,newValue : string) =>void,
    setToggleUpdate : (prev : boolean) =>void,
}
export function UpdateTodo({toggleUpdate,toUpdateTodo,updateTodo,setToggleUpdate}:UpdateTodoProps){
    const [newValue,setNewValue] = useState<string>("");
    const [updateError,setUpdateError] = useState<boolean>(false);
    return (
        <div>
            {toggleUpdate && 
            
                <div className="bg-gray-900 p-1 rounded-b-md xs:rounded-md xs:w-[200px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-300 font-bold text-[.85em]">Update Your Todo</h3>
                        <i onClick={()=>{setToggleUpdate(false)}} className="bi bi-x-square text-gray-400 hover:text-red-800 duration-100 cursor-pointer"></i>
                    </div>
                    <div>
                        <p className="text-center text-gray-500 font-thin"><span className="lowercase">Current value</span>: {toUpdateTodo?.value}</p>
                        <div className="flex flex-col font-thin">
                            <p className="text-center w-[100%] text-gray-500 lowercase">New value:</p>
                            <input onKeyDown={(e:KeyboardEvent<HTMLInputElement>)=>{
                                if(e.key==="Enter"){
                                    if(newValue.trim()!=="")
                                        updateTodo(toUpdateTodo.id,newValue)
                                    else{
                                        setUpdateError(true);
                                        setTimeout(() => {
                                            setUpdateError(false);
                                        }, 2000);
                                    }
                                }
                            }} value={newValue} onChange={(e)=>setNewValue(e.target.value)} type="text" className="outline-none border-b text-gray-500 border-b-gray-600 bg-transparent" autoFocus={true}/>
                        </div>
                        <div className="flex items-center justify-center mt-2 gap-2">
                            <button onClick={()=>{
                                if(newValue.trim()!=="")
                                    updateTodo(toUpdateTodo.id,newValue)
                                else{
                                    setUpdateError(true);
                                    setTimeout(() => {
                                        setUpdateError(false);
                                    }, 2000);
                                }
                                }} className="bg-green-700 px-2 rounded-md font-medium text-[.89em] text-gray-200 hover:bg-green-800 duration-100">update my todo</button>
                            {updateError && <i className="bi bi-exclamation-circle text-red-800"></i>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}