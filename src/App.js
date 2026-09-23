import './App.css';
import { useState, useEffect } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodows, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [completedTodos, setCompletedTodows] = useState([]);

  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditItem, setCurrentEditItem] = useState("");

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

  const handleCompleteTodo = (index) => {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-based
    let year = now.getFullYear();
    let completedOn = `${day}/${month}/${year}`;

    let filteredItem = {
      ...allTodows[index],
      completedOn: completedOn,
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodows(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteTodo = (index) => {
    let reducedTodoArr = [...allTodows];
    reducedTodoArr.splice(index, 1);
    setTodos(reducedTodoArr);
    localStorage.setItem("todoslist", JSON.stringify(reducedTodoArr));
  }

  const handleCompletedDeleteTodo = (index) => {
    let reducedCompletedArr = [...completedTodos];
    reducedCompletedArr.splice(index, 1);
    setCompletedTodows(reducedCompletedArr);
    localStorage.setItem("completedTodos", JSON.stringify(reducedCompletedArr));
  }

  useEffect(() =>{
    let savedTodos = localStorage.getItem("todoslist");
    let savedCompletedTodos = localStorage.getItem("completedTodos");
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
    if(savedCompletedTodos){
      setCompletedTodows(JSON.parse(savedCompletedTodos));
    }
  },[]);

  const handleEditTodo = (index) => {
    setCurrentEdit(index);
    setCurrentEditItem(allTodows[index]);
  }

  const handleUpdateTitle = (value) => {
    let updatedTodos = [...allTodows];
    updatedTodos[currentEdit].title = value;
    setTodos(updatedTodos);
  }

  const handleUpdateDescription = (value) => {
    let updatedTodos = [...allTodows];
    updatedTodos[currentEdit].description = value;
    setTodos(updatedTodos);
  }

  const handleSaveEdit = (index) => {
    setCurrentEdit("");
    localStorage.setItem("todoslist", JSON.stringify(allTodows));
  }

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

      {isCompleteScreen === false &&allTodows.map((item, index) => {
        if(currentEdit === index){
          return(
            <div className ="edit-wrapper" key={index}>
           <input placeholder = "Update Title" onChange ={(e) => 
            handleUpdateTitle(e.target.value)} value={currentEditItem.title}></input>
            <textarea placeholder = "Update Description" rows={4} onChange ={(e) => 
            handleUpdateDescription(e.target.value)} value={currentEditItem.description}></textarea>
            <button className="primary-button" onClick={() => handleSaveEdit(index)}> Save </button>
          </div>
          )
        }
        return(
          <div className="todo-item" key={index}>
            <div>
              <h3> {item.title} </h3>
              <p> {item.description} </p>
            </div>

            <div className="icons">
              <AiOutlineDelete className="delete-icon" onClick={() => handleDeleteTodo(index)} />
              <BsCheckLg className="check-icon" onClick={() => handleCompleteTodo(index)} />
                <AiOutlineEdit className="check-icon" onClick={() => handleEditTodo(index)} />
            </div>
          </div>
        )
      })}

      {isCompleteScreen === true && completedTodos.map((item, index) => {
        return(
          <div className="todo-item" key={index}>
            <div>
              <h3> {item.title} </h3>
              <p> {item.description} </p>
              <p> <small> Completed on : {item.completedOn} </small> </p>
            </div>

            <div className="icons">
              <AiOutlineDelete className="delete-icon" onClick={() => handleCompletedDeleteTodo(index)} />
            </div>
          </div>
        )
      })}
     </div>
    </div>
  );
}

export default App;