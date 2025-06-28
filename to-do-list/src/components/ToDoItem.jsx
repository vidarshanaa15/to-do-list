import React, { useState } from "react";

function ToDoItem(props) {
    return (
        <div className={`todo-item ${props.completed ? "completed" : ""}`}>
            <input
                type="checkbox"
                id={props.id}
                checked={props.completed}
                onChange={() => props.onToggle(props.id)} />
            <p>{props.content}</p>
            <span className={`priority-tag ${props.priority}`}>{props.priority}</span>
            <button onClick={() => props.whenDel(props.id)}>x</button>
            {/* <button onClick={props.whenDel(props.id)}>x</button> */}
            {/* this calls the function immediately during render, and it is deleted as soon as it was created */}
            {/* the modified version delays execution until user clicks */}
        </div >
    )
}

export default ToDoItem;