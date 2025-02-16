import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      
      {/* Toggle Switch with Sun/Moon Icon */}
      <div className="toggle-container">
        <span className="theme-icon">{darkMode ? "🌙" : "☀️"}</span>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="app">
        <TaskForm setTasks={setTasks} />
        <main className="app_main">
          <TaskColumn
            title="To do"
            icon={todoIcon}
            tasks={tasks}
            status="todo"
            handleDelete={(taskIndex) => {
              const newTasks = tasks.filter((_, index) => index !== taskIndex);
              setTasks(newTasks);
            }}
            darkMode={darkMode} 
          />
          <TaskColumn
            title="In Progress"
            icon={doingIcon}
            tasks={tasks}
            status="doing"
            handleDelete={(taskIndex) => {
              const newTasks = tasks.filter((_, index) => index !== taskIndex);
              setTasks(newTasks);
            }}
            darkMode={darkMode}
          />
          <TaskColumn
            title="Done"
            icon={doneIcon}
            tasks={tasks}
            status="done"
            handleDelete={(taskIndex) => {
              const newTasks = tasks.filter((_, index) => index !== taskIndex);
              setTasks(newTasks);
            }}
            darkMode={darkMode}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
