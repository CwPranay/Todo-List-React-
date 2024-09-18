import React from 'react'
import { useState, useEffect } from 'react'
import './Todobox.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function TodoBox() {
  const [Task, setTask] = useState("")
  const [Todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("Todos")

    if (todoString) {
      let todo = JSON.parse(localStorage.getItem("Todos"))
      setTodos(todo)
    }


  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }



  function handleAdd() {
    if(Task.length>=3){
    setTodos([...Todos, { id: uuidv4(), Task, isCompleted: false }])
    setTask("")
    saveToLs()
    }
  }

  function handleChange(e) { setTask(e.target.value) }

  function handleDelete(e, id) {

    let newTodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLs()
  }

  function handleEdit(e, id) {
    let todo = Todos.filter(i => i.id == id)
    setTask(todo[0].Task)
    let newTodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLs()
  }

  function handleCheckbox(e) {
    let id = e.target.name;

    let index = Todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...Todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()
  }

  
  function ToggleFinished(){
    
let btn=document.getElementById("completed")
if(showfinished){
btn.style.backgroundColor="rgb(100 116 139)"}
else{btn.style.backgroundColor="rgb(69, 90, 100)"}
    setshowfinished(!showfinished)
    
  }
  return (
    <>
      <div className="Container w-screen  text-center justify-center flex ">

        <div className="AddTask flex-col  flex rounded-xl absolute md:h-[80vh] h-[75vh] mt-10 text-white  bg-slate-700 md:w-[65%] w-[90%]  p-10 ">
          <div className="heading mb-4 font-extrabold text-xl hover:scale-105 cursor-not-allowed">To-Do Tasks</div>

          <div className="inputbar flex gap-2  justify-center">
            <input type="text" onChange={handleChange} value={Task} className='pl-4 text-black outline-none border p-2 h-10 w-80 font-medium border-slate-700 rounded-2xl' name="tasks" id="typebox" placeholder='Enter Your task' />
            <button onClick={handleAdd} className=' hover:scale-105 hover:bg-cyan-700  bg-cyan-600 font-medium text-white p-1 w-20 rounded-2xl'>Save</button>
          </div>
          <div className='flex'>
            <div  className='text-black font-medium self-start   bg-slate-500 mt-5 p-1 rounded-t-lg flex cursor-pointer ml-5'>Yours Todos</div>
            <button id='completed' className='bg-slate-500 mt-5 ml-2 p-1 rounded-t-lg text-black font-medium' onClick={ToggleFinished}>Completed</button>
          </div>
          <div className="List  bg-slate-500 h-[90vh] border  border-black rounded-lg relative scrollbar-thin overflow-auto">
            {Todos.length == 0 && <div className='text-black font-medium m-3'> No Todos to display...</div>}

            {Todos.map(item => {
              return(showfinished || !item.isCompleted) && <div key={item.id} className='bg-slate-400 text-black p-1 text-center  m-2 border overflow-x-hidden  border-black flex justify-between rounded-lg '>
                <div className='flex font-medium  gap-4'>
                  <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through break-all m-auto block whitespace-pre-line " : " m-auto break-all block whitespace-pre-line "}>{item.Task}</div>
                </div>
                <div className='flex font-medium '>
                  <button onClick={(e) => { handleEdit(e, item.id) }} className=' hover:bg-cyan-700 bg-cyan-600 pl-2 pr-2  text-center items-center text-white  h-7 f w-15 rounded-lg m-1'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='hover:bg-cyan-700 bg-cyan-600 pl-2 pr-2  text-center items-center text-white  h-7 f w-15 rounded-lg m-1'><MdDelete /></button>
                </div>
              </div>
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default TodoBox

