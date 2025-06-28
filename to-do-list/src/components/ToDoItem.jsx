import React, { useState } from "react";

function ToDoItem(props) {
    return (
        <div className={`todo-item ${props.completed ? "completed" : ""}`}>
            <input
                type="checkbox"
                id={props.id}
                checked={props.completed}
                onChange={() => props.onToggle(props.id)} />
            <p style={{
                textDecoration: props.completed ? "line-through" : "none",
                color: props.completed ? "gray" : "black"
            }}>{props.content}</p>
            <button onClick={() => props.whenDel(props.id)}>x</button>
            {/* <button onClick={props.whenDel(props.id)}>x</button> */}
            {/* this calls the function immediately during render, and it is deleted as soon as it was created */}
            {/* the modified version delays execution until user clicks */}
        </div >
    )
}

export default ToDoItem;

// make the striked out text dull coloured ✅
// add new item feature ✅
// add delete item feature ✅
// make the completed item move to bottom of list✅
// css ✅
// topic tags - high, medium, low prio
// progress /completion bar
// local storage