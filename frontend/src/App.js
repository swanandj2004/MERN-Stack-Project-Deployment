import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API = "http://your-ec2-public-ip:5000/api/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
    await axios.post(API, { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>MERN Todo App</h1>

      <div className="input-section">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
