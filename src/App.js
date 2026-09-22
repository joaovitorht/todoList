import './App.css';
import { useState } from 'react';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  return (
    <div className="App">
     <h1> Minha Lista de Tarefas </h1>

     <div className="todo-wrapper">
      <div className="todo-input">
        
      <div className="todo-input-item">
        <label>Title</label>
        <input type="text" placeholder="Enter task title"/>
      </div>

       <div className="todo-input-item">
        <label>Description</label>
        <input type="text" placeholder="Enter task description"/>
      </div>
      <div className="todo-input-item">
        <button type="button" className="primary-button">Add Task</button>
      </div>
      </div>
      
      <div className="button-area">
        <button className={`secundary-button ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}> Todo </button>
        <button className={`secundary-button ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}> Completed </button>
      </div>

      <div className="todo-list">
        <div>
          <h3> Task 1 </h3>
          <p> Description 1 </p>
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
