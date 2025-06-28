import React, { useState, useEffect, useMemo } from "react";
import ToDoItem from "./components/ToDoItem";

function App() {
  const [newItem, setnewItem] = useState("");
  const [items, setItems] = useState([]);

  // items.sort((a, b) => {
  //   if (a.completed && !b.completed) return 1;
  //   if (!a.completed && b.completed) return -1;
  //   return 0;
  // });
  // the func above does the same thing that is happening below, but is more verbose
  // TIL that js can treat booleans as numbers, so we are just subtracting 0s and 1s

  const sorted = useMemo(() => { // useMemo is for optimizing expensive calculations like .sort
    return [...items].sort((a, b) => a.completed - b.completed);
  }, [items]);

  function handleClick() {
    const item = { id: Date.now(), content: newItem, completed: false };  // date.now() to avoid clashing id's
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
    console.log(items);
  }, [items]);

  return (
    <div>
      <h1> To Do: </h1>
      <div className="input-container">
        <input type="text" onChange={(i) => setnewItem(i.target.value)} value={newItem}></input>
        <button onClick={handleClick}>Add</button>
      </div>
      {sorted.map(item => (
        <ToDoItem
          key={item.id}
          id={item.id}
          content={item.content}
          completed={item.completed}
          whenDel={deleteHandle}
          onToggle={toggleItem} />
      ))}
    </div>
  )
}

export default App;