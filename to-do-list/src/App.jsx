import React, { useState, useEffect, useMemo } from "react";
import ToDoItem from "./components/ToDoItem";

function App() {
  const [newItem, setnewItem] = useState("");
  const [items, setItems] = useState([]);
  const [priority, setPriority] = useState("low");

  // load from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // items.sort((a, b) => {
  //   if (a.completed && !b.completed) return 1;
  //   if (!a.completed && b.completed) return -1;
  //   return 0;
  // });
  // the func above does the same thing that is happening below, but is more verbose
  // TIL that js can treat booleans as numbers, so we are just subtracting 0s and 1s

  const sorted = useMemo(() => { // useMemo is used to cache calculations (triggers only when items is modified)
    return [...items].sort((a, b) => a.completed - b.completed);
  }, [items]);

  const progress = useMemo(() => {
    return items.length === 0 ? 0 : (items.filter(i => i.completed)).length / items.length * 100;
  }, [items]);

  function handleClick() {
    const item = {
      id: Date.now(),   // date.now() to avoid clashing id's
      content: newItem,
      completed: false,
      priority: priority
    };
    setItems([...items, item]);
    setnewItem(''); // clear textbox after adding
  }

  function deleteHandle(id) {
    const newList = items.filter((i) => i.id != id);
    setItems(newList);
  }

  function toggleItem(id) {
    const updated = items.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setItems(updated);
  }

  // first had this inside handleClick(), turns out react hooks cannot be used inside functions
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="layout-wrapper">
      <div className="todo-container">
        <h1>To Do</h1>
        <div className="input-container">
          <input
            type="text"
            onChange={(i) => setnewItem(i.target.value)}
            value={newItem}
            placeholder="Enter task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleClick}>Add</button>
        </div>
        {sorted.map((item) => (
          <ToDoItem
            key={item.id}
            id={item.id}
            content={item.content}
            completed={item.completed}
            priority={item.priority}
            whenDel={deleteHandle}
            onToggle={toggleItem}
          />
        ))}
      </div>

      <div className="progress-container">
        <div className="progress-bar-wrapper">
          <h3>Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                visibility: progress > 0 ? "visible" : "hidden",
                width: `${progress}%`
              }}
            ></div>
          </div>
          <p style={{ textAlign: "center", marginTop: "0.5rem", fontWeight: 500 }}>
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;