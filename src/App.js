import './App.css';
import { useState, useEffect } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodows, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDescription,
      isComplete: false
    }

    let updatedTodoArr = [...allTodows];
    updatedTodoArr.push(newTodo);
    setTodos(updatedTodoArr);
    setNewTitle("");
    setNewDescription("");
    localStorage.setItem("todoslist", JSON.stringify(updatedTodoArr));
  }

  useEffect(() =>{
    let savedTodos = localStorage.getItem("todoslist");
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
  },[]);

  return (
    <div className="App">
     <h1> Minha Lista de Tarefas </h1>

     <div className="todo-wrapper">
      <div className="todo-input">
        
      <div className="todo-input-item">
        <label>Title</label>
        <input type="text" value ={newTitle} onChange ={(e) => setNewTitle(e.target.value)} placeholder="Enter task title"/>
      </div>

       <div className="todo-input-item">
        <label>Description</label>
        <input type="text" value ={newDescription} onChange ={(e) => setNewDescription(e.target.value)} placeholder="Enter task description"/>
      </div>
      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primary-button">Add Task</button>
      </div>
      </div>
      
      <div className="button-area">
        <button className={`secundary-button ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}> Todo </button>
        <button className={`secundary-button ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}> Completed </button>
      </div>

      {allTodows.map((item, index) => {
        return(
          <div className="todo-item" key={index}>
            <div>
              <h3> {item.title} </h3>
              <p> {item.description} </p>
            </div>

            <div className="icons">
              <AiOutlineDelete className="delete-icon"/>
              <BsCheckLg className="check-icon"/>
            </div>
          </div>
        )
      })}
     </div>
    </div>
  );
}

export default App;
